package com.oldmgdn.thisapplication.PlacesActivity;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import androidx.core.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.oldmgdn.thisapplication.MainActivity.Fragments.Data.ShopData;
import com.oldmgdn.thisapplication.MainActivity.MainActivity;
import com.oldmgdn.thisapplication.PlacesActivity.Fragments.FragmentList;
import com.oldmgdn.thisapplication.PlacesActivity.Fragments.FragmentMaps;
import com.oldmgdn.thisapplication.R;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapFragment;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.ogaclejapan.smarttablayout.SmartTabLayout;
import com.ogaclejapan.smarttablayout.utils.v4.FragmentPagerItemAdapter;
import com.ogaclejapan.smarttablayout.utils.v4.FragmentPagerItems;

import java.util.ArrayList;
import java.util.List;

public class PlacesActivity extends AppCompatActivity {

    private int type;
    private ViewPager viewPager;
    private SmartTabLayout viewPagerTab;
    private TextView textView_places_activity_new_order;
    private Button button_places_activity_activity_back;
    private String text;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_places);

        initializeUI();

        setOnClickListeners();

        getIntentData();

        tabs();

        textView_places_activity_new_order.setText(text);
    }

    private void initializeUI() {

        button_places_activity_activity_back = findViewById(R.id.button_places_activity_activity_back);
        textView_places_activity_new_order = findViewById(R.id.textView_places_activity_new_order);


    }

    public void getIntentData() {

        type = getIntent().getIntExtra("type", 0);

        switch (type) {
            case R.id.nav_shops:
                text = "Автомагазины";
                break;
            case R.id.nav_service:
                text = "Автосервисы";
                break;
            case R.id.nav_gas:
                text = "Заправки";
                break;
            case R.id.nav_wheels:
                text = "Шиномонтаж";
                break;
            case R.id.nav_car_wash:
                text = "Автомойки";
                break;
            case R.id.nav_insurance:
                text = "Автострахование";
                break;

        }

    }

    public void tabs() {

        FragmentPagerItemAdapter adapter = new FragmentPagerItemAdapter(
                getSupportFragmentManager(), FragmentPagerItems.with(this)
                .add(R.string.map, FragmentMaps.class)
                .add(R.string.list, FragmentList.class)
                .create());

        viewPager = findViewById(R.id.places_activity_viewpager);
        viewPager.setAdapter(adapter);

        viewPagerTab = findViewById(R.id.places_activity_viewPagerTab);
        viewPagerTab.setViewPager(viewPager);


        viewPagerTab.setOnPageChangeListener(new ViewPager.OnPageChangeListener() {

            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
            }

            @Override
            public void onPageSelected(int position) {

            }

            @Override
            public void onPageScrollStateChanged(int state) {

            }
        });
    }

    public void setOnClickListeners() {
        button_places_activity_activity_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(PlacesActivity.this, MainActivity.class);
                startActivity(intent);
                finish();
            }
        });
    }

}
