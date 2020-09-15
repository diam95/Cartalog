package com.oldmgdn.thisapplication.MainActivity.Fragments;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;

import com.oldmgdn.thisapplication.MainActivity.Fragments.Adapters.RecyclerViewServiceAdapter;
import com.oldmgdn.thisapplication.MainActivity.Fragments.Data.RequestData;

import com.oldmgdn.thisapplication.MainActivity.MainActivity;
import com.oldmgdn.thisapplication.R;
import com.oldmgdn.thisapplication.ServiceActivity.ServiceActivity;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;

import java.util.ArrayList;
import java.util.List;

public class FragmentService extends androidx.core.app.Fragment {

    private RecyclerView recyclerView_service;
    private LinearLayoutManager recyclerView_service_layout_manager;
    private RecyclerView.Adapter recyclerView_service_adapter;
    private List<RequestData> service_list;
    private ProgressBar fragment_service_progressBar;
    private int page_pos;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        final View v = inflater.inflate(R.layout.fragment_closed, container, false);

        fragment_service_progressBar = v.findViewById(R.id.fragment_service_progressBar);

        recyclerView(v);

        return v;
    }

    public void recyclerView(View v){



        final FirebaseDatabase database = FirebaseDatabase.getInstance();
        final DatabaseReference serviceRef = database.getReference("service");

        final FirebaseAuth mAuth = FirebaseAuth.getInstance();

        service_list = new ArrayList<>();

        serviceRef.child(mAuth.getUid()).addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                service_list.add(dataSnapshot.getValue(RequestData.class));

                recyclerView_service_adapter.notifyDataSetChanged();

            }

            @Override
            public void onChildChanged(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                if (service_list.size() > 0) {


                    for (int i = 0; i < service_list.size(); i++) {

                        RequestData requestData = service_list.get(i);

                        if (dataSnapshot.getKey().equals(requestData.key)) {

                            service_list.set(i, dataSnapshot.getValue(RequestData.class));
                            recyclerView_service_adapter.notifyDataSetChanged();

                        }

                    }

                }

            }

            @Override
            public void onChildRemoved(@NonNull DataSnapshot dataSnapshot) {

                for (int i = 0; i < service_list.size(); i++) {
                    RequestData requestData = service_list.get(i);
                    if (dataSnapshot.getKey().equals(requestData.key)) {

                        service_list.remove(i);
                        recyclerView_service_adapter.notifyDataSetChanged();

                    }
                }

            }

            @Override
            public void onChildMoved(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
        serviceRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                fragment_service_progressBar.setVisibility(View.INVISIBLE);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

        recyclerView_service = v.findViewById(R.id.my_recycler_view2);

        recyclerView_service.setHasFixedSize(true);

        recyclerView_service_layout_manager = new LinearLayoutManager(getContext());
        recyclerView_service.setLayoutManager(recyclerView_service_layout_manager);

        recyclerView_service_adapter = new RecyclerViewServiceAdapter(service_list, getContext());
        recyclerView_service.setAdapter(recyclerView_service_adapter);


    }


    @Override
    public boolean onContextItemSelected(MenuItem item) {

        switch (item.getItemId()){
            case 0:

                page_pos = ((MainActivity) getActivity()).getPage_pos();

                if (page_pos == 0){

                    //Toast.makeText(getContext(), "change auto" + " " + String.valueOf(page_pos),Toast.LENGTH_SHORT).show();



                } else {

                    //Toast.makeText(getContext(), "change service" + String.valueOf(page_pos),Toast.LENGTH_SHORT).show();

                    RequestData requestData = service_list.get(item.getGroupId());

                    Intent intent = new Intent(getContext(),ServiceActivity.class);

                    intent.putExtra("manufacturer", requestData.marka);
                    intent.putExtra("model", requestData.model);
                    intent.putExtra("year", requestData.year);
                    intent.putExtra("VIN", requestData.VIN);
                    intent.putExtra("description", requestData.description);
                    intent.putExtra("image", requestData.image);
                    intent.putExtra("key", requestData.key);

                    startActivity(intent);

                }

                break;

            case 1:

                page_pos = ((MainActivity) getActivity()).getPage_pos();

                if (page_pos == 0){

                   // Toast.makeText(getContext(), "delete auto" + String.valueOf(page_pos),Toast.LENGTH_SHORT).show();


                } else {

                    //Toast.makeText(getContext(), "delete service" + String.valueOf(page_pos),Toast.LENGTH_SHORT).show();

                    RequestData requestData = service_list.get(item.getGroupId());

                    FirebaseDatabase database = FirebaseDatabase.getInstance();
                    DatabaseReference requestRef = database.getReference("service").child(requestData.user).child(requestData.key);

                    FirebaseStorage storage = FirebaseStorage.getInstance();
                    StorageReference storageRef = storage.getReference("service").child(requestData.user).child(requestData.key);

                    DatabaseReference notificationsRef = database.getReference("notifications").child(requestData.user).child(requestData.key);

                    DatabaseReference offersRef = database.getReference("offers").child(requestData.user).child(requestData.key);

                    requestRef.removeValue();
                    storageRef.delete();
                    notificationsRef.removeValue();
                    offersRef.removeValue();


                }

                break;
        }


        return super.onContextItemSelected(item);
    }

}