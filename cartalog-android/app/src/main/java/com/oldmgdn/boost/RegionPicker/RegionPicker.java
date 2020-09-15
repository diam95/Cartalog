package com.oldmgdn.boost.RegionPicker;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.widget.ContentLoadingProgressBar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import android.os.Bundle;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.oldmgdn.boost.Objects.RegionObject;
import com.oldmgdn.boost.R;
import com.oldmgdn.boost.RegionPicker.Adapter.RegionPickerRecyclerViewAdapter;

import java.util.ArrayList;
import java.util.List;

public class RegionPicker extends AppCompatActivity {

    public RecyclerView recyclerView;
    public ContentLoadingProgressBar loading;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_region_picker);

        getSupportActionBar().setTitle(R.string.choose_city);
        initializeUI();
    }

    private void initializeUI() {

        recyclerView = findViewById(R.id.activity_region_picker_RecyclerView);
        loading = findViewById(R.id.activity_region_picker_ContentLoading);
        loading.show();

        initRecyclerView();
    }

    private void initRecyclerView() {

        final List<RegionObject> citiesList = new ArrayList<>();

        boolean restartActivity = false;

        if (getIntent().hasExtra("restartActivity")) {

            restartActivity = getIntent().getBooleanExtra("restartActivity",true);

        }

        final RegionPickerRecyclerViewAdapter adapter = new RegionPickerRecyclerViewAdapter(citiesList, RegionPicker.this,restartActivity);
        LinearLayoutManager lim = new LinearLayoutManager(this,RecyclerView.VERTICAL,false);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(lim);
        recyclerView.setAdapter(adapter);

        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference dbRef = database.getReference("cities");

        dbRef.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                citiesList.add(new RegionObject(dataSnapshot.getKey(), dataSnapshot.getValue().toString()));
                loading.hide();
                adapter.notifyDataSetChanged();
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

    @Override
    public void onBackPressed() {
        super.onBackPressed();

        String from = getIntent().getStringExtra("from");

        if (from!=null){
            this.finish();
        }
    }
}
