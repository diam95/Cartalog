package com.oldmgdn.boost.RequestInfoActivity;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.core.widget.ContentLoadingProgressBar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;

import com.google.firebase.database.ValueEventListener;
import com.oldmgdn.boost.R;
import com.oldmgdn.boost.RequestActivity.RequestActivity;
import com.oldmgdn.boost.Objects.RequestObject;
import com.oldmgdn.boost.RequestInfoActivity.Adapters.RequestInfoRecyclerViewAdapter;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.ArrayList;
import java.util.List;

public class RequestInfoActivity extends AppCompatActivity {

    public RequestObject requestObject;
    public TextView TextView_auto, TextView_descr, title, no_offers, TextView_VIN;
    public RecyclerView recyclerView;
    private LinearLayoutManager layoutManager;
    private RequestInfoRecyclerViewAdapter request_info_RecyclerView_Adapter;
    private CardView cardView;
    private View delete;
    private ImageButton back;
    private List<String> vendorIDs;
    private ContentLoadingProgressBar progressBar;
    private String city;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_request_info);

        initializeUI();
        setOnClickListeners();
    }

    private void setOnClickListeners() {


        cardView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(RequestInfoActivity.this, RequestActivity.class);

                intent.putExtra("make", requestObject.make);
                intent.putExtra("model", requestObject.model);
                intent.putExtra("VIN", requestObject.VIN);
                intent.putExtra("year", requestObject.year);
                intent.putExtra("description", requestObject.description);
                intent.putExtra("timestamp", requestObject.timestamp);
                intent.putExtra("type", requestObject.type);
                intent.putExtra("userID", requestObject.userID);
                intent.putExtra("key", requestObject.key);
                intent.putExtra("city", getIntent().getStringExtra("city"));
                intent.putExtra("fromCard", "aue");

                startActivity(intent);

                RequestInfoActivity.this.finish();

            }
        });

        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

              RequestInfoActivity.this.finish();

            }
        });

        delete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                AlertDialog.Builder builder1 = new AlertDialog.Builder(RequestInfoActivity.this);
                builder1.setMessage(R.string.areYouSure);
                builder1.setCancelable(true);

                builder1.setPositiveButton(
                        "ДА",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {

                                dialog.cancel();

                                FirebaseDatabase db = FirebaseDatabase.getInstance();
                                DatabaseReference dbRef = db.getReference("requests").child(city).child(requestObject.type).child(requestObject.key);
                                DatabaseReference dbRef2 = db.getReference("messages").child(city).child(requestObject.type).child(requestObject.key);

                                dbRef.removeValue();
                                dbRef2.removeValue();

                                RequestInfoActivity.this.finish();
                            }
                        });

                builder1.setNegativeButton(
                        "Нет",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                dialog.cancel();
                            }
                        });

                AlertDialog alert11 = builder1.create();
                alert11.show();
            }
        });

    }

    private void initializeUI() {

        getSupportActionBar().hide();
        title = findViewById(R.id.activity_request_info_label);

        no_offers = findViewById(R.id.activity_request_info_no_offers_TextView);

        requestObject = new RequestObject(getIntent().getStringExtra("make"), getIntent().getStringExtra("model"), getIntent().getStringExtra("VIN"),
                getIntent().getStringExtra("year"), getIntent().getStringExtra("description"),
                getIntent().getStringExtra("type"), getIntent().getStringExtra("user"), getIntent().getStringExtra("key"),
                getIntent().getLongExtra("timestamp", 0), getIntent().getIntExtra("offersCount", 0));

        TextView_auto = findViewById(R.id.activity_request_info_TextView_auto);
        TextView_descr = findViewById(R.id.activity_request_info_TextView_descr);
        recyclerView = findViewById(R.id.activity_request_info_RecyclerView);
        TextView_VIN = findViewById(R.id.activity_request_info_TextView_VIN);

        city = getIntent().getExtras().getString("city");

        if (requestObject.type.equals("autoservice")) {
            title.setText(getString(R.string.find_service));
        } else {
            title.setText(getString(R.string.find_part));
        }

        progressBar = findViewById(R.id.activity_request_info_ContentLoadingProgressBar);

        TextView_auto.setText(requestObject.make + " " + requestObject.model + ", " + " " + requestObject.year);
        TextView_descr.setText(requestObject.description);
        TextView_VIN.setText(requestObject.VIN);

        back = findViewById(R.id.activity_request_info_back_ImageButton);
        delete = findViewById(R.id.activity_request_info_delete);
        cardView = findViewById(R.id.activity_request_info_cardview);

        recyclerView();

    }

    private void recyclerView() {

        recyclerView.setHasFixedSize(true);
        layoutManager = new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false);
        recyclerView.setLayoutManager(layoutManager);

        getOfferChats();

        request_info_RecyclerView_Adapter = new RequestInfoRecyclerViewAdapter(RequestInfoActivity.this, requestObject, vendorIDs, city);
        recyclerView.setAdapter(request_info_RecyclerView_Adapter);

    }

    public void getOfferChats() {

        System.out.println(city);
        System.out.println(requestObject.type);
        System.out.println(requestObject.key);

        final FirebaseDatabase database = FirebaseDatabase.getInstance();
        final DatabaseReference messagesRef = database.getReference("messages").child(city).child(requestObject.type).child(requestObject.key);

        vendorIDs = new ArrayList<>();

        messagesRef.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                String vendorID = dataSnapshot.getKey();

                vendorIDs.add(vendorID);
                request_info_RecyclerView_Adapter.notifyDataSetChanged();

                if (requestObject.type.equals("autoservice")){
                    no_offers.setText(R.string.offers2);
                } else {
                    no_offers.setText(R.string.offers);
                }
                no_offers.setTextColor(getColor(R.color.green));

                progressBar.hide();

            }

            @Override
            public void onChildChanged(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

            }

            @Override
            public void onChildRemoved(@NonNull DataSnapshot dataSnapshot) {

                if (vendorIDs.contains(dataSnapshot.getKey())) {

                    vendorIDs.remove(vendorIDs.indexOf(dataSnapshot.getKey()));
                    request_info_RecyclerView_Adapter.notifyDataSetChanged();
                }

                if (vendorIDs.size() == 0) {

                    no_offers.setText(R.string.no_offers);
                    no_offers.setTextColor(getColor(R.color.dark_grey));
                }
            }

            @Override
            public void onChildMoved(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
        messagesRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                progressBar.hide();
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();

           RequestInfoActivity.this.finish();

    }

}
