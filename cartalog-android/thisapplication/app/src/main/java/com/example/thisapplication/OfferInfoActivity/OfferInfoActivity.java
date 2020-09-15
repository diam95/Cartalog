package com.oldmgdn.thisapplication.OfferInfoActivity;

import android.content.Intent;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.oldmgdn.thisapplication.MainActivity.MainActivity;
import com.oldmgdn.thisapplication.R;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

public class OfferInfoActivity extends AppCompatActivity implements OnMapReadyCallback {

    private String name, SN, monFri, sat, sun, tel, type, adress;
    private Double lat, lng;
    private Button button_offer_info_activity_back;
    private TextView textView_adress, textView_offer_info_name, textView_offer_info_type, offer_info_textView_round_name, activity_offer_info_phone_number, offer_info_monday_friday_hours, offer_info_saturday_hours, offer_info_sunday_hours;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_offer_info);

        initializeUI();

        getIntentData();

        setData();

        button_offer_info_activity_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(OfferInfoActivity.this, MainActivity.class);
                finish();
                startActivity(intent);
            }
        });
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Intent intent = new Intent(OfferInfoActivity.this, MainActivity.class);
        finish();
        startActivity(intent);
    }

    public void getIntentData() {
        Intent intent = getIntent();

        SN = intent.getStringExtra("SN");
        lat = intent.getDoubleExtra("lat", 15.5);
        lng = intent.getDoubleExtra("lng", 15.5);
        monFri = intent.getStringExtra("monFri");
        sat = intent.getStringExtra("sat");
        sun = intent.getStringExtra("sun");
        tel = intent.getStringExtra("tel");
        type = intent.getStringExtra("type");
        name = intent.getStringExtra("name");
        adress = intent.getStringExtra("adress");


    }

    public void initializeUI() {
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

        button_offer_info_activity_back = findViewById(R.id.button_offer_info_activity_back);
        textView_offer_info_name = findViewById(R.id.textView_offer_info_name);
        textView_offer_info_type = findViewById(R.id.textView_offer_info_type);
        offer_info_textView_round_name = findViewById(R.id.offer_info_textView_round_name);
        activity_offer_info_phone_number = findViewById(R.id.activity_offer_info_phone_number);
        offer_info_monday_friday_hours = findViewById(R.id.offer_info_monday_friday_hours);
        offer_info_saturday_hours = findViewById(R.id.offer_info_saturday_hours);
        offer_info_sunday_hours = findViewById(R.id.offer_info_sunday_hours);
        textView_adress = findViewById(R.id.textview_adress);
    }

    public void setData() {

        textView_offer_info_name.setText(name);
        textView_offer_info_type.setText(type);
        offer_info_textView_round_name.setText(SN);
        activity_offer_info_phone_number.setText(tel);
        offer_info_monday_friday_hours.setText(monFri);
        offer_info_saturday_hours.setText(sat);
        offer_info_sunday_hours.setText(sun);
        textView_adress.setText(adress);

        activity_offer_info_phone_number.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + activity_offer_info_phone_number.getText().toString()));
                startActivity(intent);
            }
        });

    }

    @Override
    public void onMapReady(GoogleMap googleMap) {

        LatLng sydney = new LatLng(lat, lng);

        googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(sydney, 17.0f));

        Marker marker = googleMap.addMarker(new MarkerOptions().position(sydney)
                .title(name));

        marker.showInfoWindow();
    }

    @Override
    public void onPointerCaptureChanged(boolean hasCapture) {

    }
}