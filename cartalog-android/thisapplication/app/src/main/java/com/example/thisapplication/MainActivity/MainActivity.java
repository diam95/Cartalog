package com.oldmgdn.thisapplication.MainActivity;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.NavigationView;
import androidx.core.view.GravityCompat;
import androidx.core.widget.DrawerLayout;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.helper.ItemTouchHelper;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import com.oldmgdn.thisapplication.AutoActivity.AddAutoActivity;
import com.oldmgdn.thisapplication.MainActivity.Fragments.Adapters.RecyclerViewRequestAdapter;
import com.oldmgdn.thisapplication.MainActivity.Fragments.Data.RequestData;
import com.oldmgdn.thisapplication.PlacesActivity.PlacesActivity;
import com.oldmgdn.thisapplication.R;
import com.oldmgdn.thisapplication.LoginActivity.LoginActivity;
import com.oldmgdn.thisapplication.ServiceActivity.ServiceActivity;
import com.oldmgdn.thisapplication.SwipeToDeleteCallback;
import com.getbase.floatingactionbutton.FloatingActionButton;
import com.getbase.floatingactionbutton.FloatingActionsMenu;
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

public class MainActivity extends AppCompatActivity {

    private FloatingActionsMenu fam;
    private FloatingActionButton fab_auto, fab_service;
    private Button button_user;
    private DrawerLayout mDrawerLayout;
    private ImageView menu, imageView;
    private NavigationView navigationView;
    private FirebaseAuth mAuth;
    private int page_pos;
    private RecyclerView recyclerview_mainactivity_content;
    private List<RequestData> data_list;
    private LinearLayoutManager recyclerview_mainactivity_content_layout_manager;
    private RecyclerView.Adapter recyclerview_mainactivity_content_adapter;
    private String uID;
    private RequestData requestData;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        if (checkInternetConnection(getApplicationContext())) {
            initialiseUI();
            downloadData();
            content();
        } else {

            runOnUiThread(new Runnable() {
                @Override
                public void run() {

                    if (!isFinishing()) {
                        new AlertDialog.Builder(MainActivity.this)
                                .setTitle("Подключите интернет!")
                                .setMessage("Отсутствует подключение к интернету.")
                                .setCancelable(false)
                                .setPositiveButton("ok", new DialogInterface.OnClickListener() {
                                    @Override
                                    public void onClick(DialogInterface dialog, int which) {
                                        Intent intent = getIntent();
                                        finish();
                                        startActivity(intent);
                                    }
                                }).show();
                    }
                }
            });

        }




    }

    public static boolean checkInternetConnection(Context context) {
        try {
            ConnectivityManager conMgr = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);

            if (conMgr.getActiveNetworkInfo() != null && conMgr.getActiveNetworkInfo().isAvailable() && conMgr.getActiveNetworkInfo().isConnected())
                return true;
            else
                return false;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    //Инициализация пользовательского интерфейса
    public void initialiseUI() {

        uID = FirebaseAuth.getInstance().getUid();
        data_list = new ArrayList<>();
        page_pos = 0;
        fam = findViewById(R.id.fam);
        imageView = findViewById(R.id.dialog_imageView);
        fab_auto = findViewById(R.id.fab_auto);
        fab_service = findViewById(R.id.fab_service);
        button_user = findViewById(R.id.button_user);
        menu = findViewById(R.id.menu);
        mDrawerLayout = findViewById(R.id.drawer_layout);
        navigationView = findViewById(R.id.nav_view);
        mAuth = FirebaseAuth.getInstance();
        recyclerview_mainactivity_content = findViewById(R.id.recyclerview_mainactivity_content);

        if (mAuth.getUid() == null) {
            Intent intent = new Intent(MainActivity.this, LoginActivity.class);
            startActivity(intent);
            this.finish();
        } else {

            drawer();

            setOnClickListeners();

        }

    }

    public void drawer() {

        navigationView.setNavigationItemSelectedListener(
                new NavigationView.OnNavigationItemSelectedListener() {
                    @Override
                    public boolean onNavigationItemSelected(MenuItem menuItem) {

                        // set item as selected to persist highlight
                        menuItem.setChecked(false);
                        // close drawer when item is tapped

                        switch (menuItem.getItemId()) {
                            case R.id.nav_shops:
                                Intent intent = new Intent(MainActivity.this, PlacesActivity.class);
                                intent.putExtra("type", R.id.nav_shops);
                                startActivity(intent);
                                break;
                            case R.id.nav_service:
                                Intent intent2 = new Intent(MainActivity.this, PlacesActivity.class);
                                intent2.putExtra("type", R.id.nav_service);
                                startActivity(intent2);
                                break;
                            case R.id.nav_gas:
                                Intent intent3 = new Intent(MainActivity.this, PlacesActivity.class);
                                intent3.putExtra("type", R.id.nav_gas);
                                startActivity(intent3);
                                break;
                            case R.id.nav_wheels:
                                Intent intent4 = new Intent(MainActivity.this, PlacesActivity.class);
                                intent4.putExtra("type", R.id.nav_wheels);
                                startActivity(intent4);
                                break;
                            case R.id.nav_car_wash:
                                Intent intent5 = new Intent(MainActivity.this, PlacesActivity.class);
                                intent5.putExtra("type", R.id.nav_car_wash);
                                startActivity(intent5);
                                break;
                            case R.id.nav_insurance:
                                Intent intent6 = new Intent(MainActivity.this, PlacesActivity.class);
                                intent6.putExtra("type", R.id.nav_insurance);
                                startActivity(intent6);
                                break;
                        }

                        mDrawerLayout.closeDrawers();

                        // Add code here to update the UI based on the item selected
                        // For example, swap UI fragments here

                        return true;
                    }
                });
    }


    //ON CLICK EVENTS
    public void setOnClickListeners() {

        //Nav Drawer
        menu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mDrawerLayout.openDrawer(GravityCompat.START);

            }
        });


        //FAB AUTO for new auto orders.
        fab_auto.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, AddAutoActivity.class);
                startActivity(intent);
                finish();
            }
        });

        button_user.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                FirebaseAuth mAuth = FirebaseAuth.getInstance();

                if (mAuth.getCurrentUser() == null) {
                    Intent intent = new Intent(MainActivity.this, LoginActivity.class);
                    startActivity(intent);
                }

            }
        });

        fab_service.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, ServiceActivity.class);
                startActivity(intent);
                finish();
            }
        });

    }


    public int getPage_pos() {
        return page_pos;
    }

    public void content() {

        recyclerview_mainactivity_content.setHasFixedSize(true);

        recyclerview_mainactivity_content_layout_manager = new LinearLayoutManager(this);
        recyclerview_mainactivity_content.setLayoutManager(recyclerview_mainactivity_content_layout_manager);

        recyclerview_mainactivity_content_adapter = new RecyclerViewRequestAdapter(data_list, this);
        recyclerview_mainactivity_content.setAdapter(recyclerview_mainactivity_content_adapter);

        ItemTouchHelper itemTouchHelper = new
                ItemTouchHelper(new SwipeToDeleteCallback((RecyclerViewRequestAdapter) recyclerview_mainactivity_content_adapter));
        itemTouchHelper.attachToRecyclerView(recyclerview_mainactivity_content);

    }

    public void downloadData() {

        ProgressDialog progress = new ProgressDialog(MainActivity.this);
        progress.setTitle("Загрузка...");
        progress.show();

        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference mRef = database.getReference("auto").child(uID);
        DatabaseReference mRef2 = database.getReference("service").child(uID);

        mRef.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {


                data_list.add(dataSnapshot.getValue(RequestData.class));
                recyclerview_mainactivity_content_adapter.notifyDataSetChanged();

            }

            @Override
            public void onChildChanged(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                if (data_list.size() > 0) {

                    for (int i = 0; i < data_list.size(); i++) {

                        RequestData requestData = data_list.get(i);

                        if (dataSnapshot.getKey().equals(requestData.key)) {

                            data_list.set(i, dataSnapshot.getValue(RequestData.class));
                            recyclerview_mainactivity_content_adapter.notifyDataSetChanged();

                        }

                    }

                }

            }

            @Override
            public void onChildRemoved(@NonNull DataSnapshot dataSnapshot) {

                for (int i = 0; i < data_list.size(); i++) {
                    RequestData requestData = data_list.get(i);
                    if (dataSnapshot.getKey().equals(requestData.key)) {

                        data_list.remove(i);
                        recyclerview_mainactivity_content_adapter.notifyDataSetChanged();

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
        mRef2.addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {


                data_list.add(dataSnapshot.getValue(RequestData.class));

                recyclerview_mainactivity_content_adapter.notifyDataSetChanged();

            }

            @Override
            public void onChildChanged(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                if (data_list.size() > 0) {

                    for (int i = 0; i < data_list.size(); i++) {

                        RequestData requestData = data_list.get(i);

                        if (dataSnapshot.getKey().equals(requestData.key)) {

                            data_list.set(i, dataSnapshot.getValue(RequestData.class));
                            recyclerview_mainactivity_content_adapter.notifyDataSetChanged();

                        }

                    }

                }
            }

            @Override
            public void onChildRemoved(@NonNull DataSnapshot dataSnapshot) {

                for (int i = 0; i < data_list.size(); i++) {
                    RequestData requestData = data_list.get(i);
                    if (dataSnapshot.getKey().equals(requestData.key)) {

                        data_list.remove(i);
                        recyclerview_mainactivity_content_adapter.notifyDataSetChanged();

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
        mRef2.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                progress.dismiss();

                if (recyclerview_mainactivity_content_adapter.getItemCount() == 0) {
                    Toast.makeText(MainActivity.this, "Добавьте заявку", Toast.LENGTH_SHORT).show();
                }

            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

    }


    @Override
    public boolean onContextItemSelected(MenuItem item) {


        switch (item.getItemId()) {
            case 0:

                requestData = data_list.get(item.getGroupId());

                switch (requestData.type) {

                    case "auto":
                        Intent intent = new Intent(MainActivity.this, AddAutoActivity.class);
                        intent.putExtra("manufacturer", requestData.marka);
                        intent.putExtra("model", requestData.model);
                        intent.putExtra("year", requestData.year);
                        intent.putExtra("VIN", requestData.VIN);
                        intent.putExtra("description", requestData.description);
                        intent.putExtra("image", requestData.image);
                        intent.putExtra("key", requestData.key);
                        startActivity(intent);
                        break;

                    case "service":
                        Intent intent2 = new Intent(MainActivity.this, ServiceActivity.class);
                        intent2.putExtra("manufacturer", requestData.marka);
                        intent2.putExtra("model", requestData.model);
                        intent2.putExtra("year", requestData.year);
                        intent2.putExtra("VIN", requestData.VIN);
                        intent2.putExtra("description", requestData.description);
                        intent2.putExtra("image", requestData.image);
                        intent2.putExtra("key", requestData.key);
                        startActivity(intent2);
                        break;
                }


                break;

            case 1:

                requestData = data_list.get(item.getGroupId());

                FirebaseDatabase database = FirebaseDatabase.getInstance();
                DatabaseReference requestRef = database.getReference("auto").child(requestData.user).child(requestData.key);
                DatabaseReference serviceRef = database.getReference("service").child(requestData.user).child(requestData.key);

                FirebaseStorage storage = FirebaseStorage.getInstance();
                StorageReference storageRef = storage.getReference("auto").child(requestData.user).child(requestData.key);

                DatabaseReference notificationsRef = database.getReference("notifications").child(requestData.user).child(requestData.key);

                DatabaseReference offersRef = database.getReference("offers").child(requestData.user).child(requestData.key);

                requestRef.removeValue();
                storageRef.delete();
                notificationsRef.removeValue();
                offersRef.removeValue();
                serviceRef.removeValue();

                recyclerview_mainactivity_content_adapter.notifyDataSetChanged();

                break;
        }


        return super.onContextItemSelected(item);
    }

}