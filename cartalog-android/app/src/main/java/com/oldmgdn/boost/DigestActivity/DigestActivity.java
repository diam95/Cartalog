package com.oldmgdn.boost.DigestActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.oldmgdn.boost.DigestActivity.Adaрters.DigestRecyclerViewAdapter;
import com.oldmgdn.boost.Objects.РartnerObject;
import com.oldmgdn.boost.R;

import java.util.ArrayList;
import java.util.List;

public class DigestActivity extends AppCompatActivity {

    private String label_text, type, city;
    private TextView label;
    private ImageButton back;
    private RecyclerView recyclerView;
    private LinearLayoutManager layoutManager;
    private DigestRecyclerViewAdapter digest_RecyclerView_Adapter;
    private List<РartnerObject> partnerObject;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_digest);

        initializeUI();
        setOnClickListeners();
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();

        DigestActivity.this.finish();

    }

    public void setOnClickListeners() {

        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                DigestActivity.this.finish();
            }
        });
    }

    public void initializeUI() {

        city = getIntent().getStringExtra("city");

        getSupportActionBar().hide();

        label_text = getIntent().getStringExtra("type");
        label = findViewById(R.id.activity_digest_label);

        if (label_text.equals("autoparts")){

            label.setText(getString(R.string.autoparts));
        }

        if (label_text.equals("autoservice")){

            label.setText(getString(R.string.autoservice));
        }

        if (label_text.equals("carwash")){

            label.setText(getString(R.string.car_wash));
        }

        if (label_text.equals("tyres")){

            label.setText(getString(R.string.find_tyre_service));
        }

        if (label_text.equals("oilchange")){

            label.setText(getString(R.string.change_oil));
        }

        if (label_text.equals("carinsurance")){

            label.setText(getString(R.string.insurance));
        }

        if (label_text.equals("alignment")){

            label.setText(getString(R.string.alignment));
        }


        back = findViewById(R.id.activity_digest_back_ImageButton);
        recyclerView = findViewById(R.id.activity_digest_RecyclerView);

        recyclerView(getdata());

    }

    public List<РartnerObject> getdata() {

        partnerObject = new ArrayList<>();

        type = getIntent().getStringExtra("type");

        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference dbRef = database.getReference("digest").child(city).child(type);

        dbRef.orderByChild("name").addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {
                partnerObject.add(dataSnapshot.getValue(РartnerObject.class));
                digest_RecyclerView_Adapter.notifyItemInserted(partnerObject.size()-1);
            }

            @Override
            public void onChildChanged(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

            }

            @Override
            public void onChildRemoved(@NonNull DataSnapshot dataSnapshot) {

            }

            @Override
            public void onChildMoved(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

        return partnerObject;
    }

    public void recyclerView(List<РartnerObject> data) {
        recyclerView.setHasFixedSize(true);
        layoutManager = new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false);
        recyclerView.setLayoutManager(layoutManager);

        digest_RecyclerView_Adapter = new DigestRecyclerViewAdapter(data, getApplicationContext());
        recyclerView.setAdapter(digest_RecyclerView_Adapter);

    }
}
