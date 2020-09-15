package com.oldmgdn.boost.ChatWithVendor;

import android.Manifest;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.View;
import android.view.ViewTreeObserver;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.widget.NestedScrollView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import com.oldmgdn.boost.ChatWithVendor.Adapters.ChatRecyclerViewAdapter;
import com.oldmgdn.boost.DigestActivity.DigestDetailedActivity;
import com.oldmgdn.boost.Objects.ChatObject;
import com.oldmgdn.boost.Objects.РartnerObject;
import com.oldmgdn.boost.R;
import com.oldmgdn.boost.RequestInfoActivity.RequestInfoActivity;
import com.zhihu.matisse.Matisse;
import com.zhihu.matisse.MimeType;
import com.zhihu.matisse.engine.impl.GlideEngine;
import com.zhihu.matisse.internal.entity.CaptureStrategy;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class ChatWithVendorActivity extends AppCompatActivity {

    private static final int WRITE_STORAGE_PERMISSION_REQUEST_CODE = 0x3;
    public TextView label, autoTextView, describeTextView;
    public ImageButton back;
    public EditText message;
    public LinearLayout labelLayout;
    public NestedScrollView nestedScrollView;
    public View send_button, attach;
    public RecyclerView chat_RecyclerView;
    private LinearLayoutManager layoutManager;
    private ChatRecyclerViewAdapter chat_RecyclerView_Adapter;
    private List<ChatObject> chatData_list;
    private String user, key, vendorID, city, type;
    private int REQUEST_CODE_CHOOSE = 123;
    private long timeOffset;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_with_vendor);

        initializeUI();
        setOnClickListeners();

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == REQUEST_CODE_CHOOSE && resultCode == RESULT_OK) {

            chatData_list.add(new ChatObject("", "", 3, "", "", 0, 0, 0, "", 0));
            chat_RecyclerView_Adapter.notifyItemInserted(chatData_list.size() - 1);

            Date date = new Date(new Date().getTime() - timeOffset);
            final String time = DateFormat.getTimeInstance(SimpleDateFormat.SHORT, new Locale("ru")).format(date);
            final Long timestamp = new Date().getTime() - timeOffset;

            final Uri file = Matisse.obtainResult(data).get(0);

            Bitmap bmp = null;
            try {
                bmp = MediaStore.Images.Media.getBitmap(getContentResolver(), file);
            } catch (IOException e) {
                e.printStackTrace();
            }

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            bmp.compress(Bitmap.CompressFormat.JPEG, 25, baos);
            byte[] data2 = baos.toByteArray();

            FirebaseStorage storage = FirebaseStorage.getInstance();
            final StorageReference storageRef = storage.getReference("chatImages").child(city).child(type).child(key).child(vendorID).child(file.getLastPathSegment());

            UploadTask uploadTask = storageRef.putBytes(data2);

            Toast.makeText(ChatWithVendorActivity.this, R.string.loadingImage, Toast.LENGTH_SHORT).show();

            // Register observers to listen for when the download is done or if it fails
            uploadTask.addOnFailureListener(new OnFailureListener() {
                @Override
                public void onFailure(@NonNull Exception exception) {

                    Toast.makeText(ChatWithVendorActivity.this, "Что-то пошло не так...", Toast.LENGTH_SHORT).show();
                }
            }).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
                @Override
                public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {

                    storageRef.getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
                        @Override
                        public void onSuccess(Uri uri) {

                            String downloadUrl = uri.toString();

                            DatabaseReference dbRef = FirebaseDatabase.getInstance().getReference().child("messages").child(city).child(type).child(key).child(vendorID).push();

                            //TODO time
                            ChatObject chatObject = new ChatObject(downloadUrl, time, 3, key, vendorID, 1, 0, 0, user,timestamp);

                            int i = chatData_list.size();
                            chatData_list.remove(i - 1);
                            chat_RecyclerView_Adapter.notifyItemRemoved(i - 1);
                            dbRef.setValue(chatObject);

                        }
                    });


                }
            });
        } else {

            Toast.makeText(ChatWithVendorActivity.this,"Изображение не выбрано", Toast.LENGTH_SHORT).show();

        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == 0x3) {
            if (grantResults.length > 0
                    && grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                Matisse.from(ChatWithVendorActivity.this)
                        .choose(MimeType.ofImage(), false)
                        .capture(true)
                        .captureStrategy(new CaptureStrategy(true, "com.oldmgdn.boost.ChatWithVendor.fileprovider"))
                        .countable(false)
                        .maxSelectable(1)
                        .gridExpectedSize(320)
                        .restrictOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT)
                        .thumbnailScale(0.85f)
                        .imageEngine(new GlideEngine())
                        .forResult(REQUEST_CODE_CHOOSE);
            } else {

            }
        }
    }

    private void setOnClickListeners() {

        message.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                scrollToBottom();

            }
        });

        message.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {

                scrollToBottom();

            }
        });

        labelLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                final Intent intent = new Intent(ChatWithVendorActivity.this, DigestDetailedActivity.class);

                intent.putExtra("address", getIntent().getStringExtra("address"));
                intent.putExtra("coord1", getIntent().getStringExtra("coord1"));
                intent.putExtra("coord2", getIntent().getStringExtra("coord2"));
                intent.putExtra("fri", getIntent().getStringExtra("fri"));
                intent.putExtra("mon", getIntent().getStringExtra("mon"));
                intent.putExtra("name", getIntent().getStringExtra("name"));
                intent.putExtra("sat", getIntent().getStringExtra("sat"));
                intent.putExtra("sun", getIntent().getStringExtra("sun"));
                intent.putExtra("tel", getIntent().getStringExtra("tel"));
                intent.putExtra("thu", getIntent().getStringExtra("thu"));
                intent.putExtra("tue", getIntent().getStringExtra("tue"));
                intent.putExtra("uid", getIntent().getStringExtra("uid"));
                intent.putExtra("wed", getIntent().getStringExtra("wed"));


                if (getIntent().hasExtra("fromNotification")) {

                    DatabaseReference dbRef = FirebaseDatabase.getInstance().getReference("partners").child(city).child(type).child(vendorID);

                    dbRef.addListenerForSingleValueEvent(new ValueEventListener() {
                        @Override
                        public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                            if (dataSnapshot.exists()){

                                РartnerObject object = dataSnapshot.getValue(РartnerObject.class);

                                intent.putExtra("name", object.name);
                                intent.putExtra("coord1", object.coord1);
                                intent.putExtra("coord2", object.coord2);
                                intent.putExtra("tel", object.tel);
                                intent.putExtra("uid", object.uid);
                                intent.putExtra("mon", object.mon);
                                intent.putExtra("tue", object.tue);
                                intent.putExtra("wed", object.wed);
                                intent.putExtra("thu", object.thu);
                                intent.putExtra("fri", object.fri);
                                intent.putExtra("sat", object.sat);
                                intent.putExtra("sun", object.sun);
                                intent.putExtra("address", object.address);

                                startActivity(intent);

                            }

                        }

                        @Override
                        public void onCancelled(@NonNull DatabaseError databaseError) {

                        }
                    });



                } else {

                    startActivity(intent);

                }

            }
        });

        attach.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (!checkPermissionForReadExtertalStorage()) {

                    try {
                        requestPermissionForReadExtertalStorage();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else {

                    Matisse.from(ChatWithVendorActivity.this)
                            .choose(MimeType.ofImage(), false)
                            .capture(true)
                            .captureStrategy(new CaptureStrategy(true, "com.oldmgdn.boost.ChatWithVendor.fileprovider"))
                            .countable(false)
                            .maxSelectable(1)
                            .gridExpectedSize(320)
                            .restrictOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT)
                            .thumbnailScale(0.85f)
                            .imageEngine(new GlideEngine())
                            .forResult(REQUEST_CODE_CHOOSE);
                }
            }
        });

        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(ChatWithVendorActivity.this, RequestInfoActivity.class);

                intent.putExtra("make", getIntent().getStringExtra("make"));
                intent.putExtra("model", getIntent().getStringExtra("model"));
                intent.putExtra("VIN", getIntent().getStringExtra("VIN"));
                intent.putExtra("year", getIntent().getStringExtra("year"));
                intent.putExtra("description", getIntent().getStringExtra("description"));
                intent.putExtra("time", getIntent().getStringExtra("time"));
                intent.putExtra("type", getIntent().getStringExtra("type"));
                intent.putExtra("user", getIntent().getStringExtra("user"));
                intent.putExtra("key", getIntent().getStringExtra("key"));
                intent.putExtra("city", city);
                intent.putExtra("newRequest", getIntent().getIntExtra("newRequest", 0));
                if (getIntent().hasExtra("fromNotification")) {
                    intent.putExtra("fromNotification", 1);
                }
                startActivity(intent);

                ChatWithVendorActivity.this.finish();
            }
        });

        send_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (isConnected(ChatWithVendorActivity.this)) {

                    Date date = new Date(new Date().getTime() - timeOffset);
                    String time = DateFormat.getTimeInstance(SimpleDateFormat.SHORT, new Locale("ru")).format(date);

                    final Long timestamp = new Date().getTime() - timeOffset;

                    if (message.getText().length() > 0) {

                        String messageText = message.getText().toString();

                        message.setText("");

                        FirebaseDatabase database = FirebaseDatabase.getInstance();
                        DatabaseReference dbRef = database.getReference().child("messages").child(city).child(type).child(key).child(vendorID).push();

                        //TODO time
                        ChatObject chatObject = new ChatObject(messageText, time, 2, key, vendorID, 1, 0, 0, user,timestamp);

                        dbRef.setValue(chatObject);

                    }

                } else {

                    final AlertDialog.Builder builder1 = new AlertDialog.Builder(ChatWithVendorActivity.this);
                    builder1.setMessage(R.string.nointernet);
                    builder1.setCancelable(true);


                    builder1.setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {

                            if (isConnected(ChatWithVendorActivity.this)) {
                                dialog.dismiss();

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
        });
    }

    public void scrollToBottom() {

        nestedScrollView.getViewTreeObserver().addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
            @Override
            public void onGlobalLayout() {
                final int scrollViewHeight = nestedScrollView.getHeight();
                if (scrollViewHeight > 0) {

                    nestedScrollView.getViewTreeObserver().removeOnGlobalLayoutListener(this);

                    final View lastView = nestedScrollView.getChildAt(nestedScrollView.getChildCount() - 1);
                    final int lastViewBottom = lastView.getBottom() + nestedScrollView.getPaddingBottom();
                    final int deltaScrollY = lastViewBottom - scrollViewHeight - nestedScrollView.getScrollY();

                    nestedScrollView.smoothScrollBy(0, deltaScrollY);
                    nestedScrollView.clearFocus();
                }
            }
        });
    }

    public boolean checkPermissionForReadExtertalStorage() {

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            int result = ChatWithVendorActivity.this.checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE);
            return result == PackageManager.PERMISSION_GRANTED;
        }
        return false;
    }

    public void requestPermissionForReadExtertalStorage() throws Exception {

        try {
            ActivityCompat.requestPermissions(ChatWithVendorActivity.this, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
                    WRITE_STORAGE_PERMISSION_REQUEST_CODE);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    private void initializeUI() {

        getSupportActionBar().hide();

        chatData_list = new ArrayList<>();

        nestedScrollView = findViewById(R.id.activity_chat_NestedScrollView);

        describeTextView = findViewById(R.id.activity_chat_with_vendor_describe_TextView);
        autoTextView = findViewById(R.id.activity_chat_with_vendor_auto_TextView);

        String make = getIntent().getStringExtra("make");
        String model = getIntent().getStringExtra("model");
        String year = getIntent().getStringExtra("year");
        String description = getIntent().getStringExtra("description");
        city = getIntent().getStringExtra("city");
        type = getIntent().getStringExtra("type");

        autoTextView.setText(make + " " + model + ", " + year);
        describeTextView.setText(description);
        timeOffset = getSharedPreferences(getString(R.string.timeOffset), MODE_PRIVATE).getLong(getString(R.string.timeOffset),0);

        REQUEST_CODE_CHOOSE = 1;
        attach = findViewById(R.id.activity_chat_with_vendor_attach);
        user = getIntent().getStringExtra("user");
        key = getIntent().getStringExtra("key");
        vendorID = getIntent().getStringExtra("vendorID");

        labelLayout = findViewById(R.id.activity_chat_label_layout);

        chat_RecyclerView = findViewById(R.id.activity_chat_recyclerView);

        label = findViewById(R.id.activity_chat_label);
        back = findViewById(R.id.activity_chat_back_ImageButton);


        label.setText(getIntent().getStringExtra("vendorName"));

        message = findViewById(R.id.activity_chat_send_message_edittext);

        send_button = findViewById(R.id.activity_chat_send_view);

        requestRecyclerView();

    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();

        Intent intent2 = new Intent(ChatWithVendorActivity.this, RequestInfoActivity.class);

        intent2.putExtra("make", getIntent().getStringExtra("make"));
        intent2.putExtra("model", getIntent().getStringExtra("model"));
        intent2.putExtra("VIN", getIntent().getStringExtra("VIN"));
        intent2.putExtra("year", getIntent().getStringExtra("year"));
        intent2.putExtra("description", getIntent().getStringExtra("description"));
        intent2.putExtra("time", getIntent().getStringExtra("time"));
        intent2.putExtra("type", getIntent().getStringExtra("type"));
        intent2.putExtra("user", getIntent().getStringExtra("user"));
        intent2.putExtra("key", getIntent().getStringExtra("key"));
        intent2.putExtra("city", city);

        if (getIntent().hasExtra("fromNotification")) {
            intent2.putExtra("fromNotification", 1);
        }

        startActivity(intent2);
        ChatWithVendorActivity.this.finish();
    }

    private void requestRecyclerView() {

        chat_RecyclerView.setHasFixedSize(false);
        layoutManager = new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false);
        layoutManager.setStackFromEnd(true);
        chat_RecyclerView.setLayoutManager(layoutManager);

        getChatData();

        chat_RecyclerView_Adapter = new ChatRecyclerViewAdapter(chatData_list, ChatWithVendorActivity.this);
        chat_RecyclerView.setAdapter(chat_RecyclerView_Adapter);

    }

    private void getChatData() {

        FirebaseDatabase database = FirebaseDatabase.getInstance();

        final DatabaseReference dbRef = database.getReference("messages").child(city).child(type).child(key).child(vendorID);

        dbRef.orderByKey().addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                ChatObject object = dataSnapshot.getValue(ChatObject.class);

                chatData_list.add(object);
                chat_RecyclerView_Adapter.notifyItemInserted(chatData_list.size() - 1);

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

    public final static boolean isConnected(Context context) {
        final ConnectivityManager connectivityManager =
                (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        final NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
        return networkInfo != null && networkInfo.isConnected();
    }
}
