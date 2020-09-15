package com.oldmgdn.thisapplication.AutoActivity;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.drawable.Drawable;
import android.net.ConnectivityManager;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.CardView;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.oldmgdn.thisapplication.AutoActivity.Helpers.CarChooser;
import com.oldmgdn.thisapplication.MainActivity.MainActivity;
import com.oldmgdn.thisapplication.R;

import com.google.android.gms.tasks.Continuation;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ServerValue;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import com.squareup.picasso.Picasso;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

public class AddAutoActivity extends AppCompatActivity {


    private String manufacturer, model, year, VIN, imagee, description, key, modell;
    private Button button_add_auto_activity_back, button_OK;
    private CardView add_auto_activity_cardView_choose;
    private TextView add_auto_activity_textView_choose_auto;
    private ImageView imageView_gallery_intent, imageView_ic_delete;
    private static final int PICK_IMAGE_REQUEST = 1;
    private EditText editText_details;
    private Drawable image;
    private Uri image_link;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_auto);
        initializeUI();
        getIntentData();
        setOnClickListeners();
        cardView();


    }

    private void initializeUI() {
        button_add_auto_activity_back = findViewById(R.id.button_add_auto_activity_back);
        add_auto_activity_cardView_choose = findViewById(R.id.add_auto_activity_cardView_choose);
        add_auto_activity_textView_choose_auto = findViewById(R.id.add_auto_activity_textView_choose_auto);
        imageView_gallery_intent = findViewById(R.id.imageView_gallery_intent);
        imageView_ic_delete = findViewById(R.id.imageView_ic_delete);
        image = getResources().getDrawable(R.drawable.ic_camera);
        button_OK = findViewById(R.id.button_OK);
        editText_details = findViewById(R.id.editText_details);
        model = null;
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

    private void setOnClickListeners() {
        button_add_auto_activity_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(AddAutoActivity.this, MainActivity.class);
                startActivity(intent);
                finish();
            }
        });

        add_auto_activity_cardView_choose.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(AddAutoActivity.this, CarChooser.class);
                description = editText_details.getText().toString();
                intent.putExtra("description", description);
                intent.putExtra("image", imagee);
                intent.putExtra("key", key);
                startActivity(intent);
            }
        });

        imageView_gallery_intent.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.setType("image/*");
                intent.setAction(Intent.ACTION_GET_CONTENT);
                startActivityForResult(Intent.createChooser(intent, "Select Picture"), PICK_IMAGE_REQUEST);
            }
        });

        imageView_ic_delete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                imageView_gallery_intent.setImageBitmap(null);
                imageView_gallery_intent.setBackground(image);
                image_link = null;
                imageView_ic_delete.setVisibility(View.INVISIBLE);
            }
        });


        button_OK.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                ProgressDialog progress = new ProgressDialog(AddAutoActivity.this);
                progress.show();

                if (checkInternetConnection(getApplicationContext())) {

                    if (editText_details.getText().length() != 0 && model != null) {
                        FirebaseAuth mAuth = FirebaseAuth.getInstance();
                        FirebaseDatabase database = FirebaseDatabase.getInstance();
                        FirebaseStorage storage = FirebaseStorage.getInstance();
                        if (key == null) {
                            final DatabaseReference myRef = database.getReference("auto").child(mAuth.getUid()).push();
                            final StorageReference storageRef = storage.getReference("auto").child(mAuth.getUid()).child(myRef.getKey());
                            myRef.child("marka").setValue(manufacturer);

                            FirebaseInstanceId.getInstance().getInstanceId().addOnCompleteListener(new OnCompleteListener<InstanceIdResult>() {
                                @Override
                                public void onComplete(@NonNull Task<InstanceIdResult> task) {
                                    String deviceToken = task.getResult().getToken();
                                    myRef.child("device_token").setValue(deviceToken);
                                }
                            });


                            if (image_link != null & myRef.getKey() != null) {
                                storageRef.putFile(image_link).continueWithTask(new Continuation<UploadTask.TaskSnapshot, Task<Uri>>() {
                                    @Override
                                    public Task<Uri> then(@NonNull Task<UploadTask.TaskSnapshot> task) throws Exception {
                                        if (!task.isSuccessful()) {
                                            throw task.getException();
                                        }
                                        return storageRef.getDownloadUrl();
                                    }
                                }).addOnCompleteListener(new OnCompleteListener<Uri>() {
                                    @Override
                                    public void onComplete(@NonNull Task<Uri> task) {
                                        if (task.isSuccessful()) {
                                            Uri downloadUri = task.getResult();
                                            myRef.child("image").setValue(downloadUri.toString());
                                        } else {
                                            Toast.makeText(AddAutoActivity.this, "Ошибка загрузки... " + task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                                        }
                                    }
                                });
                            }

                            String time = "-" + System.currentTimeMillis();


                            myRef.child("model").setValue(model);
                            myRef.child("model").setValue(model);
                            myRef.child("year").setValue(year);
                            myRef.child("VIN").setValue(VIN);
                            myRef.child("type").setValue("auto");
                            myRef.child("Time").setValue(Long.parseLong(time));
                            myRef.child("key").setValue(myRef.getKey());
                            myRef.child("description").setValue(editText_details.getText().toString());
                            myRef.child("user").setValue(mAuth.getCurrentUser().getUid()).addOnCompleteListener(new OnCompleteListener<Void>() {
                                @Override
                                public void onComplete(@NonNull Task<Void> task) {
                                    progress.dismiss();
                                    Intent intent = new Intent(AddAutoActivity.this, MainActivity.class);
                                    finish();
                                    startActivity(intent);
                                }
                            });

                        } else {

                            final DatabaseReference myRef = database.getReference("auto").child(mAuth.getUid()).child(key);
                            final StorageReference storageRef = storage.getReference("auto").child(mAuth.getCurrentUser().getUid()).child(key);

                            DatabaseReference notificationsRef = database.getReference("notifications").child(mAuth.getUid()).child(key);
                            notificationsRef.removeValue();

                            DatabaseReference offersRef = database.getReference("offers").child(mAuth.getUid()).child(key);
                            offersRef.removeValue();

                            myRef.child("offers_count").removeValue();

                            myRef.child("marka").setValue(manufacturer);
                            if (image_link != null & myRef.getKey() != null) {
                                storageRef.putFile(image_link).continueWithTask(new Continuation<UploadTask.TaskSnapshot, Task<Uri>>() {
                                    @Override
                                    public Task<Uri> then(@NonNull Task<UploadTask.TaskSnapshot> task) throws Exception {
                                        if (!task.isSuccessful()) {
                                            throw task.getException();
                                        }
                                        return storageRef.getDownloadUrl();
                                    }
                                }).addOnCompleteListener(new OnCompleteListener<Uri>() {
                                    @Override
                                    public void onComplete(@NonNull Task<Uri> task) {
                                        if (task.isSuccessful()) {
                                            Uri downloadUri = task.getResult();
                                            myRef.child("image").setValue(downloadUri.toString());
                                        } else {
                                            Toast.makeText(AddAutoActivity.this, "Ошибка загрузки... " + task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                                        }
                                    }
                                });
                            }

                            myRef.child("model").setValue(model);
                            myRef.child("year").setValue(year);
                            myRef.child("VIN").setValue(VIN);
                            myRef.child("key").setValue(myRef.getKey());
                            myRef.child("Time").setValue(ServerValue.TIMESTAMP);
                            myRef.child("description").setValue(editText_details.getText().toString());
                            myRef.child("user").setValue(mAuth.getCurrentUser().getUid()).addOnCompleteListener(new OnCompleteListener<Void>() {
                                @Override
                                public void onComplete(@NonNull Task<Void> task) {
                                    progress.dismiss();
                                    Intent intent = new Intent(AddAutoActivity.this, MainActivity.class);
                                    finish();
                                    startActivity(intent);
                                }
                            });

                        }

                    } else {
                        Toast.makeText(AddAutoActivity.this, "Заполните заявку", Toast.LENGTH_SHORT).show();
                    }
                } else {

                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {

                            if (!isFinishing()) {
                                new AlertDialog.Builder(AddAutoActivity.this)
                                        .setTitle("Подключите интернет!")
                                        .setMessage("Отсутствует подключение к интернету.")
                                        .setCancelable(false)
                                        .setPositiveButton("ok", new DialogInterface.OnClickListener() {
                                            @Override
                                            public void onClick(DialogInterface dialog, int which) {
                                                Intent intent = getIntent();
                                                intent.putExtra("manufacturer", manufacturer);
                                                intent.putExtra("model", model);
                                                intent.putExtra("VIN", VIN);
                                                intent.putExtra("year", year);
                                                intent.putExtra("description", description);
                                                intent.putExtra("image", imagee);
                                                if (key != null) {
                                                    intent.putExtra("key", key);
                                                }

                                                finish();
                                                startActivity(intent);
                                            }
                                        }).show();
                            }
                        }
                    });

                }
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {

            Uri uri = data.getData();

            try {

                Bitmap bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), uri);

                image_link = uri;
                //Toast.makeText(AddAutoActivity.this,image,Toast.LENGTH_SHORT).show();
                imageView_gallery_intent.setBackground(null);
                imageView_gallery_intent.setImageBitmap(bitmap);
                imageView_ic_delete.setVisibility(View.VISIBLE);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Intent intent = new Intent(AddAutoActivity.this, MainActivity.class);
        startActivity(intent);
        finish();

    }

    //Вызывается в случае прихода в эту активность не из mainActivity
    public void getIntentData() {
        manufacturer = getIntent().getStringExtra("manufacturer");
        modell = getIntent().getStringExtra("model");
        if (modell != null) {
            model = modell.trim();
        }
        year = getIntent().getStringExtra("year");
        VIN = getIntent().getStringExtra("VIN");
        description = getIntent().getStringExtra("description");
        imagee = getIntent().getStringExtra("image");
        key = getIntent().getStringExtra("key");
    }


    public void cardView() {
        if (manufacturer == null | model == null | year == null | VIN == "") {
        } else {
            // Toast.makeText(AddAutoActivity.this, manufacturer + model + year + VIN, Toast.LENGTH_SHORT).show();
            Picasso.get().load(imagee).into(imageView_gallery_intent);
            editText_details.setText(description);
            add_auto_activity_textView_choose_auto.setText("Автомобиль: " + manufacturer + ", " + model + "\n" + "Год: " + year + "\n" + "VIN: " + VIN);
        }
    }

    public Map time() {

        Map<String, Object> time = new HashMap<>();

        time.put("timestamp", ServerValue.TIMESTAMP);

        return time;
    }

}

