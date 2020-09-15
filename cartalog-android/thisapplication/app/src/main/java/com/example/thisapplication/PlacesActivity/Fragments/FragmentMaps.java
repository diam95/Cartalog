package com.oldmgdn.thisapplication.PlacesActivity.Fragments;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import com.oldmgdn.thisapplication.MainActivity.Fragments.Data.ShopData;
import com.oldmgdn.thisapplication.MainActivity.MainActivity;
import com.oldmgdn.thisapplication.OfferInfoActivity.OfferInfoActivity;
import com.oldmgdn.thisapplication.PlacesActivity.PlacesActivity;
import com.oldmgdn.thisapplication.R;
import com.google.android.gms.maps.CameraUpdate;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.LatLngBounds;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.ArrayList;
import java.util.List;

public class FragmentMaps extends androidx.core.app.Fragment implements OnMapReadyCallback {

    private DatabaseReference mRef;
    private List<ShopData> shopDatas;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        final View v = inflater.inflate(R.layout.fragment_fragment_maps, container, false);

        SupportMapFragment mapFragment = (SupportMapFragment) getChildFragmentManager()
                .findFragmentById(R.id.places_activity_map);
        mapFragment.getMapAsync(this);

        return v;


    }


    @Override
    public void onMapReady(GoogleMap googleMap) {

        FirebaseDatabase database = FirebaseDatabase.getInstance();

        int type = getActivity().getIntent().getIntExtra("type", 0);

        switch (type) {

            case R.id.nav_shops:
                mRef = database.getReference("shops");
                break;
            case R.id.nav_service:
                mRef = database.getReference("autoservice");
                break;
            case R.id.nav_gas:
                mRef = database.getReference("gas");
                break;
            case R.id.nav_wheels:
                mRef = database.getReference("wheels");
                break;
            case R.id.nav_car_wash:
                mRef = database.getReference("carwash");
                break;
            case R.id.nav_insurance:
                mRef = database.getReference("insurance");
                break;
        }

        shopDatas = new ArrayList<>();

        mRef.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                ShopData shopData = dataSnapshot.getValue(ShopData.class);

                shopDatas.add(dataSnapshot.getValue(ShopData.class));

                Marker marker = googleMap.addMarker(new MarkerOptions().position(new LatLng(shopData.lat, shopData.lng)));
                marker.setTitle(shopData.name);
                googleMap.setOnInfoWindowClickListener(new GoogleMap.OnInfoWindowClickListener() {
                    @Override
                    public void onInfoWindowClick(Marker marker) {


                        for (int i = 0; i < shopDatas.size(); i++) {
                            if (shopDatas.get(i).name.equals(marker.getTitle().toString())) {
                                Intent intent = new Intent(getContext(), OfferInfoActivity.class);

                                intent.putExtra("SN", shopDatas.get(i).SN);
                                intent.putExtra("lat", shopDatas.get(i).lat);
                                intent.putExtra("lng", shopDatas.get(i).lng);
                                intent.putExtra("monFri", shopDatas.get(i).monFri);
                                intent.putExtra("sat", shopDatas.get(i).sat);
                                intent.putExtra("sun", shopDatas.get(i).sun);
                                intent.putExtra("tel", shopDatas.get(i).tel);
                                intent.putExtra("type", shopDatas.get(i).type);
                                intent.putExtra("name", shopDatas.get(i).name);
                                intent.putExtra("adress", shopDatas.get(i).adress);

                                startActivity(intent);
                            }
                        }

                    }
                });

                googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(shopData.lat, shopData.lng), 12.0f));

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

    }

}
