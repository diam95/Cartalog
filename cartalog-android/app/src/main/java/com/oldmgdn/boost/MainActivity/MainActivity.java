package com.oldmgdn.boost.MainActivity;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.CompoundButton;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.Switch;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.drawable.DrawableCompat;
import androidx.core.view.GravityCompat;
import androidx.core.widget.ContentLoadingProgressBar;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.github.clans.fab.FloatingActionButton;
import com.github.clans.fab.FloatingActionMenu;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.navigation.NavigationView;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;
import com.instacart.library.truetime.TrueTime;
import com.oldmgdn.boost.DigestActivity.DigestActivity;
import com.oldmgdn.boost.FeedbackActivity.FeedbackActivity;
import com.oldmgdn.boost.IntroActivity.IntroActivity;
import com.oldmgdn.boost.LoginActivity.LoginActivity;
import com.oldmgdn.boost.MainActivity.Adapters.AppBarLayoutRecyclerViewAdapter;
import com.oldmgdn.boost.MainActivity.Adapters.RequestRecyclerViewAdapter;
import com.oldmgdn.boost.Objects.AdvObject;
import com.oldmgdn.boost.Objects.RequestObject;
import com.oldmgdn.boost.R;
import com.oldmgdn.boost.RegionPicker.RegionPicker;
import com.oldmgdn.boost.RequestActivity.RequestActivity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;


public class MainActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {

    private static final Integer VERSION = 1119;
    private RecyclerView advRecyclerView;
    private FloatingActionButton fab_part;
    private FloatingActionButton fab_service;
    private RecyclerView requestsRecyclerView;
    private ContentLoadingProgressBar progressBar;
    private DrawerLayout drawerLayout;
    private ImageButton drawerButon, profileButton;
    private ImageView newRequestImageView;
    private LinearLayoutManager requestsRecyclerViewLinearLayoutManager;
    private List<RequestObject> requestsList;
    private String city, uid;
    private FirebaseUser user;
    private Switch notificationSwitch;
    private SharedPreferences sharedPref;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        checkUpdates();

        final SharedPreferences sharedPreferences = getSharedPreferences(getString(R.string.timeOffset), MODE_PRIVATE);

        if (!sharedPreferences.contains(getString(R.string.timeOffset))) {

            new Thread() {
                public void run() {
                    try {

                        TrueTime.build().initialize();
                        SharedPreferences.Editor editor = sharedPreferences.edit();

                        long timestamp = TrueTime.now().getTime();//125
                        long millis = new Date().getTime();//120
                        long timeOffset = millis - timestamp + 3600000;

                        editor.putLong(getString(R.string.timeOffset), timeOffset);
                        editor.apply();

                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                }
            }.start();

        }

        getSupportActionBar().hide();

        if (isConnected(this)) {

            if (checkUser()) {

                checkCity();

            } else {

                Intent intent = new Intent(MainActivity.this, IntroActivity.class);
                startActivity(intent);
                this.finish();
            }

        } else {

            final AlertDialog.Builder builder1 = new AlertDialog.Builder(MainActivity.this);
            builder1.setMessage(R.string.nointernet);
            builder1.setCancelable(true);

            builder1.setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {

                    if (isConnected(MainActivity.this)) {
                        dialog.dismiss();
                        if (checkUser()) {

                            checkCity();

                        } else {

                            Intent intent = new Intent(MainActivity.this, LoginActivity.class);
                            startActivity(intent);
                            MainActivity.this.finish();
                        }
                    } else {

                        AlertDialog alert11 = builder1.create();
                        alert11.show();
                    }
                }
            });
            AlertDialog alert11 = builder1.create();
            alert11.show();
        }

    }

    private void checkUpdates() {

        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference dbRef = database.getReference();

        dbRef.child("version").addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                if (dataSnapshot.exists()){

                    int version = Integer.parseInt(dataSnapshot.getValue().toString());

                    if (version != VERSION){

                        Toast.makeText(MainActivity.this, getResources().getString(R.string.updateApp), Toast.LENGTH_LONG).show();
                        Intent intent = new Intent(Intent.ACTION_VIEW);
                        intent.setData(Uri.parse("market://details?id=com.oldmgdn.boost"));
                        startActivity(intent);

                        MainActivity.this.finish();

                    }

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }
    private void checkCity() {

        uid = user.getUid();

        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference dbRef = database.getReference("users").child(uid).child("city");
        dbRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                if (dataSnapshot.exists()) {
                    city = dataSnapshot.getValue().toString();
                    initUI();
                    setOnclickListeners();
                    initFCM();
                } else {

                    Intent intent = new Intent(MainActivity.this, RegionPicker.class);
                    intent.putExtra("restartActivity", true);
                    startActivity(intent);
                    MainActivity.this.finish();

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }

    @Override
    public void onBackPressed() {

        AlertDialog.Builder builder1 = new AlertDialog.Builder(MainActivity.this);
        builder1.setMessage(R.string.close);
        builder1.setCancelable(true);

        builder1.setPositiveButton(
                "ДА",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        MainActivity.this.finish();
                    }
                });

        builder1.setNegativeButton(
                "Нет",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.cancel();
                    }
                });

        AlertDialog alert11 = builder1.create();
        alert11.show();
    }

    private boolean checkUser() {

        FirebaseAuth mAuth = FirebaseAuth.getInstance();
        user = mAuth.getCurrentUser();

        return user != null;
    }

    private void initUI() {

        newRequestImageView = findViewById(R.id.activity_main_newRequest_ImageView);
        fab_part = findViewById(R.id.activity_main_FAM_FAB_parts);
        fab_service = findViewById(R.id.activity_main_FAM_FAB_service);
        profileButton = findViewById(R.id.activity_main_profile_ImageButton);
        progressBar = findViewById(R.id.activity_main_ContentLoadingProgressBar);
        drawerButon = findViewById(R.id.activity_main_menu_ImageButton);
        drawerLayout = findViewById(R.id.activity_main_DrawerLayout);
        notificationSwitch = findViewById(R.id.notification_switch);
        sharedPref = getApplicationContext().getSharedPreferences("notificationStatus", Context.MODE_PRIVATE);

        notificationSwitchTint();

        advRecyclerView();
        requestsRecyclerView();

    }

    private void notificationSwitchTint() {

        int[][] states = new int[][]{
                new int[]{android.R.attr.state_checked},
                new int[]{-android.R.attr.state_checked},
        };

        int[] trackColors = new int[]{
                Color.GREEN,
                Color.GRAY,
        };

        notificationSwitch.setTrackTintList(new ColorStateList(states, trackColors));
        DrawableCompat.setTintList(DrawableCompat.wrap(notificationSwitch.getTrackDrawable()), new ColorStateList(states, trackColors));

        notificationSwitch.setChecked(false);
        notificationSwitch.setChecked(true);

        boolean isOn;

        if (sharedPref.contains(getString(R.string.notifications_on))) {
            isOn = sharedPref.getBoolean(getString(R.string.notifications_on), false);
        } else {
            isOn = true;
        }

        notificationSwitch.setChecked(isOn);


    }

    private void advRecyclerView() {

        final List<AdvObject> ads = new ArrayList<>();

        final AppBarLayoutRecyclerViewAdapter advRecyclerViewAdapter = new AppBarLayoutRecyclerViewAdapter(ads, this);
        LinearLayoutManager advRecyclerViewLinearLayoutManager = new LinearLayoutManager(this, RecyclerView.HORIZONTAL, false);
        advRecyclerView = findViewById(R.id.activity_main_AppBarLayout_RecyclerView);
        advRecyclerView.setHasFixedSize(true);

        FirebaseDatabase database = FirebaseDatabase.getInstance();

        final DatabaseReference advDBreference = database.getReference("advs").child(city);

        advDBreference.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                ads.add(dataSnapshot.getValue(AdvObject.class));
                Collections.shuffle(ads);
                advRecyclerViewAdapter.notifyDataSetChanged();
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

        advRecyclerView.setLayoutManager(advRecyclerViewLinearLayoutManager);
        advRecyclerView.setAdapter(advRecyclerViewAdapter);
    }

    private void requestsRecyclerView() {

        final String userID = user.getUid();
        requestsList = new ArrayList<>();

        final RequestRecyclerViewAdapter requestRecyclerViewAdapter = new RequestRecyclerViewAdapter(requestsList, this, city);
        requestsRecyclerViewLinearLayoutManager = new LinearLayoutManager(this, RecyclerView.VERTICAL, false);
        requestsRecyclerView = findViewById(R.id.activity_main_request_RecyclerView);
        requestsRecyclerView.setHasFixedSize(true);
        requestsRecyclerViewLinearLayoutManager.setReverseLayout(true);
        requestsRecyclerViewLinearLayoutManager.setStackFromEnd(true);

        FirebaseDatabase database = FirebaseDatabase.getInstance();

        final DatabaseReference partsRef = database.getReference("requests").child(city).child("autoparts");
        final DatabaseReference serviceRef2 = database.getReference("requests").child(city).child("autoservice");

        partsRef.orderByChild("userID").equalTo(userID).addListenerForSingleValueEvent(new ValueEventListener() {

            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                if (!dataSnapshot.exists()) {

                    newRequestImageView.setVisibility(View.VISIBLE);
                    progressBar.hide();

                }

                serviceRef2.orderByChild("userID").equalTo(userID).addChildEventListener(new ChildEventListener() {

                    @Override
                    public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {


                        newRequestImageView.setVisibility(View.INVISIBLE);
                        requestsList.add(dataSnapshot.getValue(RequestObject.class));
                        requestRecyclerViewAdapter.notifyItemInserted(requestsList.size() - 1);
                        requestsRecyclerViewLinearLayoutManager.scrollToPositionWithOffset(0, -1000000);

                        progressBar.hide();

                    }

                    @Override
                    public void onChildChanged(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                        for (int i = 0; i < requestsList.size(); i++) {

                            if (requestsList.get(i).key.equals(dataSnapshot.getKey())) {
                                requestsList.set(i, dataSnapshot.getValue(RequestObject.class));
                                requestRecyclerViewAdapter.notifyItemChanged(i);
                            }
                        }
                    }

                    @Override
                    public void onChildRemoved(@NonNull DataSnapshot dataSnapshot) {

                        for (int i = 0; i < requestsList.size(); i++) {


                            if (requestsList.get(i).key.equals(dataSnapshot.getKey())) {
                                requestsList.remove(i);
                                requestRecyclerViewAdapter.notifyItemRemoved(i);
                            }
                            if (requestsList.size() == 0) {
                                newRequestImageView.setVisibility(View.VISIBLE);
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

            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

        partsRef.orderByChild("userID").equalTo(userID).addChildEventListener(new ChildEventListener() {

            @Override
            public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                newRequestImageView.setVisibility(View.INVISIBLE);
                requestsList.add(dataSnapshot.getValue(RequestObject.class));
                requestRecyclerViewAdapter.notifyItemInserted(requestsList.size() - 1);
                requestsRecyclerViewLinearLayoutManager.scrollToPositionWithOffset(0, -1000000);

                progressBar.hide();

            }

            @Override
            public void onChildChanged(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                for (int i = 0; i < requestsList.size(); i++) {

                    if (requestsList.get(i).key.equals(dataSnapshot.getKey())) {
                        requestsList.set(i, dataSnapshot.getValue(RequestObject.class));
                        requestRecyclerViewAdapter.notifyItemChanged(i);
                    }
                }
            }

            @Override
            public void onChildRemoved(@NonNull DataSnapshot dataSnapshot) {

                for (int i = 0; i < requestsList.size(); i++) {

                    if (requestsList.get(i).key.equals(dataSnapshot.getKey())) {
                        requestsList.remove(i);
                        requestRecyclerViewAdapter.notifyItemRemoved(i);
                    }

                    if (requestsList.size() == 0) {
                        newRequestImageView.setVisibility(View.VISIBLE);
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

        requestsRecyclerView.setLayoutManager(requestsRecyclerViewLinearLayoutManager);
        requestsRecyclerView.setAdapter(requestRecyclerViewAdapter);
    }

    private void setOnclickListeners() {

        final FloatingActionMenu floatingActionMenu = findViewById(R.id.activity_main_FAM);
        fab_part.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(MainActivity.this, RequestActivity.class);
                intent.putExtra("type", "autoparts");
                intent.putExtra("city", city);
                intent.putExtra("newRequest", 1);
                intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                floatingActionMenu.close(true);

                startActivity(intent);
            }
        });

        fab_service.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent2 = new Intent(MainActivity.this, RequestActivity.class);
                intent2.putExtra("type", "autoservice");
                intent2.putExtra("city", city);
                intent2.putExtra("newRequest", 1);
                intent2.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                floatingActionMenu.close(true);

                startActivity(intent2);

            }
        });


        drawerButon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                drawerLayout.openDrawer(GravityCompat.START);
            }
        });

        profileButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(MainActivity.this, RegionPicker.class);
                startActivity(intent);
            }
        });

        notificationSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {

                SharedPreferences.Editor editor = sharedPref.edit();
                editor.putBoolean(getString(R.string.notifications_on), isChecked);
                editor.apply();

            }
        });

        setNavigationViewListener();
    }

    private void setNavigationViewListener() {

        NavigationView navigationView = findViewById(R.id.NavigationView);
        navigationView.setNavigationItemSelectedListener(this);
    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {

        int id = menuItem.getItemId();

//TODO city type

        switch (id) {
            case R.id.nav_parts:
                Intent intent = new Intent(MainActivity.this, RequestActivity.class);
                intent.putExtra("type", "autoparts");
                intent.putExtra("newRequest", 1);
                intent.putExtra("city", city);
                startActivity(intent);
                break;
            case R.id.nav_service:
                Intent intent2 = new Intent(MainActivity.this, RequestActivity.class);
                intent2.putExtra("type", "autoservice");
                intent2.putExtra("newRequest", 1);
                intent2.putExtra("city", city);
                startActivity(intent2);
                break;
            case R.id.nav_autoparts:
                Intent intentt = new Intent(MainActivity.this, DigestActivity.class);
                intentt.putExtra("type", "autoparts");
                intentt.putExtra("city", city);
                startActivity(intentt);
                break;
            case R.id.nav_car_service:
                Intent intenttt = new Intent(MainActivity.this, DigestActivity.class);
                intenttt.putExtra("type", "autoservice");
                intenttt.putExtra("city", city);
                startActivity(intenttt);
                break;
            case R.id.nav_carWash:
                Intent intent3 = new Intent(MainActivity.this, DigestActivity.class);
                intent3.putExtra("type", "carwash");
                intent3.putExtra("city", city);
                startActivity(intent3);
                break;
            case R.id.nav_tires:
                Intent intent4 = new Intent(MainActivity.this, DigestActivity.class);
                intent4.putExtra("type", "tyres");
                intent4.putExtra("city", city);
                startActivity(intent4);
                break;
            case R.id.nav_oil:
                Intent intent5 = new Intent(MainActivity.this, DigestActivity.class);
                intent5.putExtra("type", "oilchange");
                intent5.putExtra("city", city);
                startActivity(intent5);
                break;
            case R.id.nav_insurance:
                Intent intent6 = new Intent(MainActivity.this, DigestActivity.class);
                intent6.putExtra("type", "carinsurance");
                intent6.putExtra("city", city);
                startActivity(intent6);
                break;
            case R.id.nav_alignment:
                Intent intent7 = new Intent(MainActivity.this, DigestActivity.class);
                intent7.putExtra("type", "alignment");
                intent7.putExtra("city", city);
                startActivity(intent7);
                break;
            case R.id.nav_feedback:
                Intent intent8 = new Intent(MainActivity.this, FeedbackActivity.class);
                intent8.putExtra("city", city);
                startActivity(intent8);
                break;
        }

        drawerLayout.closeDrawer(GravityCompat.START);
        return false;
    }

    private void sendRegistrationToServer(String token) {

        String userID = user.getUid();
        DatabaseReference reference = FirebaseDatabase.getInstance().getReference();
        reference.child("users").child(userID).child("messagingToken").setValue(token);
    }

    private void initFCM() {

        FirebaseInstanceId.getInstance().getInstanceId()
                .addOnCompleteListener(new OnCompleteListener<InstanceIdResult>() {
                    @Override
                    public void onComplete(@NonNull Task<InstanceIdResult> task) {
                        if (!task.isSuccessful()) {
                            return;
                        }

                        // Get new Instance ID token
                        String token = task.getResult().getToken();

                        // Log and toast
                        sendRegistrationToServer(token);
                    }
                });
    }

    public static boolean isConnected(Context context) {
        final ConnectivityManager connectivityManager =
                (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        final NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
        return networkInfo != null && networkInfo.isConnected();
    }
}



