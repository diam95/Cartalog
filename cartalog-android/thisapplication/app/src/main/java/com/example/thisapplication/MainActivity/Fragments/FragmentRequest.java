package com.oldmgdn.thisapplication.MainActivity.Fragments;

import android.app.AlertDialog;
import android.app.ProgressDialog;
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

import com.oldmgdn.thisapplication.AutoActivity.AddAutoActivity;
import com.oldmgdn.thisapplication.MainActivity.Fragments.Adapters.RecyclerViewRequestAdapter;
import com.oldmgdn.thisapplication.MainActivity.Fragments.Data.RequestData;
import com.oldmgdn.thisapplication.MainActivity.MainActivity;
import com.oldmgdn.thisapplication.R;
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

public class FragmentRequest extends androidx.core.app.Fragment {

    private RecyclerView recyclerView_active;
    private LinearLayoutManager recyclerView_active_layout_manager;
    private RecyclerView.Adapter recyclerView_active_adapter;
    private List<RequestData> request_list;
    private int page_pos;
    private ProgressBar fragment_active_progressBar;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
        final View v = inflater.inflate(R.layout.fragment_active, container, false);

        fragment_active_progressBar = v.findViewById(R.id.fragment_active_progressBar);
        recyclerView(v);

        return v;


    }

    public void recyclerView(View v) {

        final FirebaseDatabase database = FirebaseDatabase.getInstance();
        final DatabaseReference requestRef = database.getReference("auto");

        final FirebaseAuth mAuth = FirebaseAuth.getInstance();

        request_list = new ArrayList<>();

        requestRef.child(mAuth.getUid()).addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                request_list.add(dataSnapshot.getValue(RequestData.class));

                recyclerView_active_adapter.notifyDataSetChanged();

            }

            @Override
            public void onChildChanged(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                if (request_list.size() > 0) {


                    for (int i = 0; i < request_list.size(); i++) {

                        RequestData requestData = request_list.get(i);

                        if (dataSnapshot.getKey().equals(requestData.key)) {

                            request_list.set(i, dataSnapshot.getValue(RequestData.class));
                            recyclerView_active_adapter.notifyDataSetChanged();

                        }

                    }

                }

            }

            @Override
            public void onChildRemoved(@NonNull DataSnapshot dataSnapshot) {

                for (int i = 0; i < request_list.size(); i++) {
                    RequestData requestData = request_list.get(i);
                    if (dataSnapshot.getKey().equals(requestData.key)) {

                        request_list.remove(i);
                        recyclerView_active_adapter.notifyDataSetChanged();

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
        requestRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                fragment_active_progressBar.setVisibility(View.INVISIBLE);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

        recyclerView_active = v.findViewById(R.id.recycler_view_active);

        recyclerView_active.setHasFixedSize(true);

        recyclerView_active_layout_manager = new LinearLayoutManager(getContext());
        recyclerView_active.setLayoutManager(recyclerView_active_layout_manager);

        recyclerView_active_adapter = new RecyclerViewRequestAdapter(request_list, getContext());
        recyclerView_active.setAdapter(recyclerView_active_adapter);

    }


    @Override
    public boolean onContextItemSelected(MenuItem item) {


        switch (item.getItemId()) {
            case 0:

                page_pos = ((MainActivity) getActivity()).getPage_pos();

                if (page_pos == 0) {

                    //Toast.makeText(getContext(), "change auto" + String.valueOf(page_pos),Toast.LENGTH_SHORT).show();

                    RequestData requestData = request_list.get(item.getGroupId());

                    Intent intent = new Intent(getContext(), AddAutoActivity.class);

                    intent.putExtra("manufacturer", requestData.marka);
                    intent.putExtra("model", requestData.model);
                    intent.putExtra("year", requestData.year);
                    intent.putExtra("VIN", requestData.VIN);
                    intent.putExtra("description", requestData.description);
                    intent.putExtra("image", requestData.image);
                    intent.putExtra("key", requestData.key);

                    startActivity(intent);


                } else {

                    // Toast.makeText(getContext(), "change service" + String.valueOf(page_pos),Toast.LENGTH_SHORT).show();


                }

                break;

            case 1:

                page_pos = ((MainActivity) getActivity()).getPage_pos();

                if (page_pos == 0) {
                    //Toast.makeText(getContext(), "delete auto" + String.valueOf(page_pos),Toast.LENGTH_SHORT).show();

                    RequestData requestData = request_list.get(item.getGroupId());

                    FirebaseDatabase database = FirebaseDatabase.getInstance();
                    DatabaseReference requestRef = database.getReference("auto").child(requestData.user).child(requestData.key);

                    FirebaseStorage storage = FirebaseStorage.getInstance();
                    StorageReference storageRef = storage.getReference("auto").child(requestData.user).child(requestData.key);

                    DatabaseReference notificationsRef = database.getReference("notifications").child(requestData.user).child(requestData.key);

                    DatabaseReference offersRef = database.getReference("offers").child(requestData.user).child(requestData.key);

                    requestRef.removeValue();
                    storageRef.delete();
                    notificationsRef.removeValue();
                    offersRef.removeValue();

                    recyclerView_active_adapter.notifyDataSetChanged();


                } else {
                    //Toast.makeText(getContext(), "delete service" + String.valueOf(page_pos),Toast.LENGTH_SHORT).show();


                }

                break;
        }


        return super.onContextItemSelected(item);
    }

}
