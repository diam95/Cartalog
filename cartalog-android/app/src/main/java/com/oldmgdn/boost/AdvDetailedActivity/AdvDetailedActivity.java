package com.oldmgdn.boost.AdvDetailedActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.widget.ContentLoadingProgressBar;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.oldmgdn.boost.DigestActivity.DigestDetailedActivity;
import com.oldmgdn.boost.Objects.РartnerObject;
import com.oldmgdn.boost.PhotoFullPopupWindow;
import com.oldmgdn.boost.R;
import com.squareup.picasso.Picasso;

public class AdvDetailedActivity extends AppCompatActivity {

    private ImageView image;
    private ImageButton back;
    private String advRef;
    private TextView title;
    private TextView content;
    private TextView vendor;
    private LinearLayout cardHolder, digestHolder;
    private ContentLoadingProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_adv_detailed);

        initUI();
        setOnclickListeners();
        getPartnerData();

    }

    private void getPartnerData() {

        final String vendorID = getIntent().getStringExtra("vendorID");

        DatabaseReference db = FirebaseDatabase.getInstance().getReference("partners2").child(vendorID).child("info");

        db.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {


                String name = dataSnapshot.child("name").getValue().toString();
                String city = dataSnapshot.child("city").getValue().toString();
                String type = dataSnapshot.child("type").getValue().toString();

                vendor.setText(name);

                DatabaseReference dbref = FirebaseDatabase.getInstance().getReference("partners").child(city).child(type).child(vendorID);

                dbref.addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull final DataSnapshot dataSnapshot) {

                        System.out.println(dataSnapshot.getValue());

                        progressBar.hide();
                        digestHolder.setVisibility(View.VISIBLE);

                        cardHolder.setOnClickListener(new View.OnClickListener() {
                            @Override
                            public void onClick(View view) {

                                РartnerObject рartnerObject = dataSnapshot.getValue(РartnerObject.class);

                                Intent intent = new Intent(AdvDetailedActivity.this, DigestDetailedActivity.class);

                                intent.putExtra("address", рartnerObject.address);
                                intent.putExtra("coord1", рartnerObject.coord1);
                                intent.putExtra("coord2", рartnerObject.coord2);
                                intent.putExtra("fri", рartnerObject.fri);
                                intent.putExtra("mon", рartnerObject.mon);
                                intent.putExtra("name", рartnerObject.name);
                                intent.putExtra("sat", рartnerObject.sat);
                                intent.putExtra("sun", рartnerObject.sun);
                                intent.putExtra("tel", рartnerObject.tel);
                                intent.putExtra("thu", рartnerObject.thu);
                                intent.putExtra("tue", рartnerObject.tue);
                                intent.putExtra("uid", рartnerObject.uid);
                                intent.putExtra("wed", рartnerObject.wed);

                                startActivity(intent);

                            }
                        });

                    }

                    @Override
                    public void onCancelled(@NonNull DatabaseError databaseError) {

                    }
                });

            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });


    }

    private void initUI() {

        getSupportActionBar().hide();

        image = findViewById(R.id.activity_adv_detailed_ImageView);
        title = findViewById(R.id.activity_adv_detailed_TextView_Title);
        content = findViewById(R.id.activity_adv_detailed_TextView_Content);
        vendor = findViewById(R.id.activity_adv_detailed_Card_TextView);
        back = findViewById(R.id.activity_adv_detailed_ImageButton);
        cardHolder = findViewById(R.id.activity_adv_detailed_LinearLayout_CardView_holder);
        digestHolder = findViewById(R.id.activity_adv_detailed_LinearLayout_Card_LinearLayout3);
        progressBar = findViewById(R.id.activity_adv_detailed_LinearLayout_Card_ContentLoadingProgressBar);

        progressBar.show();


        advRef = getIntent().getStringExtra("advRef");

        Picasso.get().load(advRef).into(image);

        title.setText(getIntent().getStringExtra("title"));

        String contentText = getIntent().getStringExtra("content");

        if (contentText.contains("_n")) {
            String newText = contentText.replace("_n", "\n");
            content.setText(newText);
        } else {
            content.setText(contentText);
        }


    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();

        AdvDetailedActivity.this.finish();

    }

    private void setOnclickListeners() {

        image.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                new PhotoFullPopupWindow(AdvDetailedActivity.this, image, advRef, null);

            }
        });

        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                AdvDetailedActivity.this.finish();

            }
        });

    }


}
