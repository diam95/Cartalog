package com.oldmgdn.boost.DigestActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.fragment.app.FragmentActivity;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.oldmgdn.boost.Objects.РartnerObject;
import com.oldmgdn.boost.R;


public class DigestDetailedActivity extends FragmentActivity implements OnMapReadyCallback {

    private РartnerObject object;
    private TextView sunday, saturday, title, adress, work_hours_mon, work_hours_tue, work_hours_wed, work_hours_thu, work_hours_fri, work_hours_sat, work_hours_sun, tel;
    private ImageButton button_back;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_digest_detailed);
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
        initializeUI();

        setOnClickListeners();


    }

    private void setOnClickListeners() {

        button_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                DigestDetailedActivity.this.finish();
            }
        });

        tel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String number = tel.getText().toString();
                Intent intent = new Intent(Intent.ACTION_DIAL, Uri.fromParts("tel", number, null));
                startActivity(intent);
            }
        });
    }

    private void initializeUI() {

        object = new РartnerObject(
                getIntent().getStringExtra("address"),
                getIntent().getStringExtra("coord1"),
                getIntent().getStringExtra("coord2"),
                getIntent().getStringExtra("fri"),
                getIntent().getStringExtra("mon"),
                getIntent().getStringExtra("name"),
                getIntent().getStringExtra("sat"),
                getIntent().getStringExtra("sun"),
                getIntent().getStringExtra("tel"),
                getIntent().getStringExtra("thu"),
                getIntent().getStringExtra("tue"),
                getIntent().getStringExtra("uid"),
                getIntent().getStringExtra("wed")
        );

        title = findViewById(R.id.activity_digest_detailed_label);
        adress = findViewById(R.id.activity_digest_detailed_adr);
        work_hours_mon = findViewById(R.id.activity_digest_detailed_work_hours_mn);
        work_hours_tue = findViewById(R.id.activity_digest_detailed_work_hours_tu);
        work_hours_thu = findViewById(R.id.activity_digest_detailed_work_hours_th);
        work_hours_sat = findViewById(R.id.activity_digest_detailed_work_hours_sa);
        work_hours_sun = findViewById(R.id.activity_digest_detailed_work_hours_su);
        work_hours_wed = findViewById(R.id.activity_digest_detailed_work_hours_wed);
        work_hours_fri = findViewById(R.id.activity_digest_detailed_work_hours_fr);
        sunday = findViewById(R.id.activity_digest_detailed_work_hours7);
        saturday = findViewById(R.id.activity_digest_detailed_work_hours6);
        button_back = findViewById(R.id.activity_digest_detailed_back_ImageButton);
        tel = findViewById(R.id.activity_digest_detailed_phone_number);

        title.setText(object.name);
        adress.setText(object.address);
        work_hours_mon.setText(object.mon);
        work_hours_tue.setText(object.tue);
        work_hours_thu.setText(object.thu);
        work_hours_sat.setText(object.sat);
        work_hours_sun.setText(object.sun);
        work_hours_wed.setText(object.wed);
        work_hours_fri.setText(object.fri);
        tel.setText(object.tel);

        if (object.sat.equals("Выходной")){
            saturday.setTextColor(getColor(R.color.light_light_red));
            work_hours_sat.setTextColor(getColor(R.color.light_light_red));
        }
        if (object.sun.equals("Выходной")){
            sunday.setTextColor(getColor(R.color.light_light_red));
            work_hours_sun.setTextColor(getColor(R.color.light_light_red));
        }

    }


    @Override
    public void onMapReady(GoogleMap googleMap) {

        googleMap.getUiSettings().setCompassEnabled(false);

        double d1 = Double.parseDouble(object.coord1);
        double d2 = Double.parseDouble(object.coord2);

        double d3 = Double.parseDouble(object.coord1) - 0.003;

        LatLng sydney = new LatLng(d1, d2);
        LatLng sydney2 = new LatLng(d3, d2);

        googleMap.moveCamera(CameraUpdateFactory.newLatLng(sydney2));
        googleMap.animateCamera(CameraUpdateFactory.newLatLngZoom(sydney2, 15.0f));

        googleMap.addMarker(new MarkerOptions().position(sydney).title(object.name)).showInfoWindow();

        googleMap.setMapType(GoogleMap.MAP_TYPE_NORMAL);
    }
}
