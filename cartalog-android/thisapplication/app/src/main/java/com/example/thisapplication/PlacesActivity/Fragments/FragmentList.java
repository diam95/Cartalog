package com.oldmgdn.thisapplication.PlacesActivity.Fragments;

import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.oldmgdn.thisapplication.MainActivity.Fragments.Data.ShopData;
import com.oldmgdn.thisapplication.PlacesActivity.Adapters.RecyclerViewPlacesAdapter;
import com.oldmgdn.thisapplication.R;
import com.google.android.gms.common.internal.ShowFirstParty;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.ArrayList;
import java.util.List;

public class FragmentList extends androidx.core.app.Fragment {

    private RecyclerView fragment_list_recyclerView;
    private LinearLayoutManager recyclerView_active_layout_manager;
    private List<ShopData> shop_list;
    private DatabaseReference mRef;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {

        final View v = inflater.inflate(R.layout.fragment_fragment_list, container, false);

        fragment_list_recyclerView = v.findViewById(R.id.fragment_list_recyclerView);

        recyclerView();

        return v;


    }

    private void recyclerView() {


        shop_list = new ArrayList<>();

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

        mRef.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                shop_list.add(dataSnapshot.getValue(ShopData.class));
                fragment_list_recyclerView.getAdapter().notifyDataSetChanged();

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

        fragment_list_recyclerView.setHasFixedSize(true);

        recyclerView_active_layout_manager = new LinearLayoutManager(getContext());
        fragment_list_recyclerView.setLayoutManager(recyclerView_active_layout_manager);

        RecyclerView.Adapter fragment_list_recyclerView_adapter = new RecyclerViewPlacesAdapter(shop_list, getContext());
        fragment_list_recyclerView.setAdapter(fragment_list_recyclerView_adapter);

    }

}