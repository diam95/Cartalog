package com.oldmgdn.boost.RequestActivity;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.oldmgdn.boost.ChooseCarActivity.ChooseCarActivity;
import com.oldmgdn.boost.ChooseCarActivity.ChooseCarModelActivity;
import com.oldmgdn.boost.Objects.RequestObject;
import com.oldmgdn.boost.R;
import com.oldmgdn.boost.RequestInfoActivity.RequestInfoActivity;

import java.util.Date;

public class RequestActivity extends AppCompatActivity {

    private ImageButton close_button;
    private MaterialButton button_back, button_ok;
    private TextInputEditText editText_make, editText_model, editText_VIN, editText_year, editText_description;
    private TextInputLayout layout_make, layout_model, layout_VIN, layout_year, layout_description;
    private int newRequest;
    private String type, userID;
    private RequestObject requestObjectOld;
    private Long timeOffset;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_request);

        initUI();
        setOnClickListeners();

    }

    private void initUI() {

        getSupportActionBar().hide();

        close_button = findViewById(R.id.activity_request_back_ImageButton);
        editText_make = findViewById(R.id.activity_request_make_EditText);
        editText_model = findViewById(R.id.activity_request_model_EditText);
        editText_VIN = findViewById(R.id.activity_request_VIN_EditText);
        editText_year = findViewById(R.id.activity_request_year_EditText);
        editText_description = findViewById(R.id.activity_request_description_EditText);

        layout_make = findViewById(R.id.activity_request_auto_make_input);
        layout_model = findViewById(R.id.activity_request_auto_model_input);
        layout_VIN = findViewById(R.id.activity_request_auto_VIN_input);
        layout_year = findViewById(R.id.activity_request_auto_year_input);
        layout_description = findViewById(R.id.activity_request_describe_part_input);
        TextView label = findViewById(R.id.activity_request_label);


        button_back = findViewById(R.id.activity_request_back_button);
        button_ok = findViewById(R.id.activity_request_ok_button);
        timeOffset = getSharedPreferences(getString(R.string.timeOffset), MODE_PRIVATE).getLong(getString(R.string.timeOffset),0);

        type = getIntent().getStringExtra("type");
        userID = FirebaseAuth.getInstance().getCurrentUser().getUid();

        newRequest = getIntent().getIntExtra("newRequest", 0);


        if (type.equals("autoservice")) {
            label.setText(R.string.find_service);
            layout_description.setHint(getResources().getString(R.string.describe_malfunction));
        }

        if (getIntent().getStringExtra("make") != null) {
            editText_make.setText(getIntent().getStringExtra("make"));
        }
        if (getIntent().getStringExtra("VIN") != null) {
            editText_VIN.setText(getIntent().getStringExtra("VIN"));
        }
        if (getIntent().getStringExtra("model") != null) {
            editText_model.setText(getIntent().getStringExtra("model"));
        }
        if (getIntent().getStringExtra("year") != null) {
            editText_year.setText(getIntent().getStringExtra("year"));
        }
        if (getIntent().getStringExtra("description") != null) {
            editText_description.setText(getIntent().getStringExtra("description"));
        }

    }

    private void setOnClickListeners() {

        close_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (getIntent().hasExtra("fromCard")){

                    Intent intent = new Intent(RequestActivity.this, RequestInfoActivity.class);

                    intent.putExtra("make", getIntent().getStringExtra("make"));
                    intent.putExtra("model", getIntent().getStringExtra("model"));
                    intent.putExtra("VIN", getIntent().getStringExtra("VIN"));
                    intent.putExtra("year", getIntent().getStringExtra("year"));
                    intent.putExtra("description", getIntent().getStringExtra("description"));
                    intent.putExtra("timestamp", getIntent().getStringExtra("timestamp"));
                    intent.putExtra("type", getIntent().getStringExtra("type"));
                    intent.putExtra("userID", getIntent().getStringExtra("userID"));
                    intent.putExtra("key", getIntent().getStringExtra("key"));
                    intent.putExtra("newRequest", 0);
                    intent.putExtra("city", getIntent().getStringExtra("city"));

                    startActivity(intent);

                    RequestActivity.this.finish();

                } else {

                    RequestActivity.this.finish();

                }

            }
        });

        button_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (getIntent().hasExtra("fromCard")){

                    Intent intent = new Intent(RequestActivity.this, RequestInfoActivity.class);

                    intent.putExtra("make", getIntent().getStringExtra("make"));
                    intent.putExtra("model", getIntent().getStringExtra("model"));
                    intent.putExtra("VIN", getIntent().getStringExtra("VIN"));
                    intent.putExtra("year", getIntent().getStringExtra("year"));
                    intent.putExtra("description", getIntent().getStringExtra("description"));
                    intent.putExtra("timestamp", getIntent().getStringExtra("timestamp"));
                    intent.putExtra("type", getIntent().getStringExtra("type"));
                    intent.putExtra("userID", getIntent().getStringExtra("userID"));
                    intent.putExtra("key", getIntent().getStringExtra("key"));
                    intent.putExtra("newRequest", 0);
                    intent.putExtra("city", getIntent().getStringExtra("city"));

                    startActivity(intent);

                    RequestActivity.this.finish();

                } else {

                    RequestActivity.this.finish();

                }

            }
        });

        editText_make.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {

                Intent intent = new Intent(RequestActivity.this, ChooseCarActivity.class);
                intent.putExtra("type", type);
                intent.putExtra("city", getIntent().getStringExtra("city"));
                intent.putExtra("newRequest", newRequest);

                if (editText_VIN.getText().toString().length() > 0) {
                    intent.putExtra("VIN", editText_VIN.getText().toString());
                }
                if (editText_year.getText().toString().length() > 0) {
                    intent.putExtra("year", editText_year.getText().toString());
                }
                if (editText_description.getText().toString().length() > 0) {
                    intent.putExtra("description", editText_description.getText().toString());
                }
                if (getIntent().getStringExtra("user") != null) {
                    intent.putExtra("user", getIntent().getStringExtra("user"));
                }
                if (getIntent().getStringExtra("key") != null) {
                    intent.putExtra("key", getIntent().getStringExtra("key"));
                }
                if (getIntent().getStringExtra("make") != null) {
                    intent.putExtra("make", getIntent().getStringExtra("make"));
                }
                if (getIntent().getStringExtra("model") != null) {
                    intent.putExtra("model", getIntent().getStringExtra("model"));
                }

                startActivity(intent);

                RequestActivity.this.finish();

            }
        });

        editText_model.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View v, boolean hasFocus) {

                if (editText_make.getText().toString().length() > 0) {

                    Intent intent = new Intent(RequestActivity.this, ChooseCarModelActivity.class);
                    intent.putExtra("type", type);
                    intent.putExtra("city", getIntent().getStringExtra("city"));
                    intent.putExtra("newRequest", newRequest);
                    intent.putExtra("make", editText_make.getText().toString());

                    if (editText_VIN.getText().toString().length() > 0) {
                        intent.putExtra("VIN", editText_VIN.getText().toString());
                    }
                    if (editText_year.getText().toString().length() > 0) {
                        intent.putExtra("year", editText_year.getText().toString());
                    }
                    if (editText_description.getText().toString().length() > 0) {
                        intent.putExtra("description", editText_description.getText().toString());
                    }
                    if (getIntent().getStringExtra("user") != null) {
                        intent.putExtra("user", getIntent().getStringExtra("user"));
                    }
                    if (getIntent().getStringExtra("key") != null) {
                        intent.putExtra("key", getIntent().getStringExtra("key"));
                    }
                    if (getIntent().getStringExtra("make") != null) {
                        intent.putExtra("make", getIntent().getStringExtra("make"));
                    }
                    if (getIntent().getStringExtra("model") != null) {
                        intent.putExtra("model", getIntent().getStringExtra("model"));
                    }

                    startActivity(intent);

                    RequestActivity.this.finish();


                } else {

                    Intent intent = new Intent(RequestActivity.this, ChooseCarActivity.class);
                    intent.putExtra("type", type);
                    intent.putExtra("newRequest", newRequest);

                    if (editText_VIN.getText().toString().length() > 0) {
                        intent.putExtra("VIN", editText_VIN.getText().toString());
                    }
                    if (editText_year.getText().toString().length() > 0) {
                        intent.putExtra("year", editText_year.getText().toString());
                    }
                    if (editText_description.getText().toString().length() > 0) {
                        intent.putExtra("description", editText_description.getText().toString());
                    }
                    if (getIntent().getStringExtra("user") != null) {
                        intent.putExtra("user", getIntent().getStringExtra("user"));
                    }
                    if (getIntent().getStringExtra("key") != null) {
                        intent.putExtra("key", getIntent().getStringExtra("key"));
                    }

                    startActivity(intent);

                    RequestActivity.this.finish();

                }
            }
        });

        button_ok.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (isConnected(RequestActivity.this)) {

                    if (everythingIsOk()) {

                        final String city = getIntent().getStringExtra("city");

                        final FirebaseDatabase firebaseDatabase = FirebaseDatabase.getInstance();
                        final DatabaseReference dbRef = firebaseDatabase.getReference("requests").child(city).child(type);
                        final DatabaseReference requestRef = dbRef.push();

                        final Long timestamp = new Date().getTime() - timeOffset;

                        final RequestObject requestObject = new RequestObject(editText_make.getText().toString(),
                                editText_model.getText().toString(), editText_VIN.getText().toString(),
                                editText_year.getText().toString(), editText_description.getText().toString(),
                                type, userID, requestRef.getKey(), -timestamp, 0);

                        if (newRequest == 1) {

                            button_ok.setOnClickListener(null);

                            requestRef.setValue(requestObject).addOnCompleteListener(new OnCompleteListener<Void>() {
                                @Override
                                public void onComplete(@NonNull Task<Void> task) {

                                    Intent intent=new Intent();
                                    intent.putExtra("isNewRequest",true);
                                    setResult(2,intent);
                                    RequestActivity.this.finish();

                                }
                            });

                        } else if (newRequest == 0) {

                            final String key = getIntent().getStringExtra("key");

                            dbRef.orderByKey().equalTo(key).addChildEventListener(new ChildEventListener() {
                                @Override
                                public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                                    if (requestObjectOld == null) {

                                        requestObjectOld = dataSnapshot.getValue(RequestObject.class);

                                        if (requestObjectOld.make.equals(requestObject.make) && requestObjectOld.model.equals(requestObject.model)
                                                && requestObjectOld.VIN.equals(requestObject.VIN) && requestObjectOld.year.equals(requestObject.year)
                                                && requestObjectOld.description.equals(requestObject.description)) {

                                            RequestActivity.this.finish();

                                        } else {

                                            AlertDialog.Builder builder1 = new AlertDialog.Builder(RequestActivity.this);
                                            builder1.setMessage(R.string.changesApplied);
                                            builder1.setCancelable(true);

                                            builder1.setPositiveButton(
                                                    "ДА",
                                                    new DialogInterface.OnClickListener() {
                                                        public void onClick(final DialogInterface dialog, int id) {

                                                            DatabaseReference messagesRef = firebaseDatabase.getReference("messages").child(city).child(type).child(userID).child(key);

                                                            messagesRef.removeValue();
                                                            dbRef.child(key).removeValue();

                                                            button_ok.setOnClickListener(null);
                                                            System.out.println("case 0");

                                                            requestRef.setValue(requestObject).addOnCompleteListener(new OnCompleteListener<Void>() {
                                                                @Override
                                                                public void onComplete(@NonNull Task<Void> task) {
                                                                    requestRef.child("timestamp").setValue(-timestamp).addOnCompleteListener(new OnCompleteListener<Void>() {
                                                                        @Override
                                                                        public void onComplete(@NonNull Task<Void> task) {
                                                                            Intent intent=new Intent();
                                                                            intent.putExtra("isNewRequest",true);
                                                                            setResult(2,intent);
                                                                            RequestActivity.this.finish();
                                                                        }
                                                                    });
                                                                }
                                                            });
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
                                    }

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

                    } else {
                        Toast.makeText(RequestActivity.this, "Ошибка", Toast.LENGTH_SHORT).show();
                    }

                } else {

                    final AlertDialog.Builder builder1 = new AlertDialog.Builder(RequestActivity.this);
                    builder1.setMessage(R.string.nointernet);
                    builder1.setCancelable(true);


                    builder1.setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {

                            dialog.dismiss();
                        }
                    });
                    AlertDialog alert11 = builder1.create();
                    alert11.show();
                }
            }
        });
    }

    private boolean everythingIsOk() {

        boolean everythingIsOk = true;

        if (editText_make.getText().toString().length() < 1) {

            everythingIsOk = false;
            layout_make.setError("Выберите марку автомобиля!");
        }

        if (editText_model.getText().toString().length() < 1) {
            everythingIsOk = false;
            layout_model.setError("Выберите модель автомобиля!");
        }

        if (editText_VIN.getText().toString().length() < 1) {
            everythingIsOk = false;
            layout_VIN.setError("Введите номер кузова!");
        }

        if (editText_year.getText().toString().length() < 1) {
            everythingIsOk = false;
            layout_year.setError("Введите год выпуска!");
        }

        if (editText_description.getText().toString().length() < 1) {
            everythingIsOk = false;
            layout_description.setError("Опишите деталь, которую Вы ищите!");
        }

        return everythingIsOk;

    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();

        if (getIntent().hasExtra("fromCard")){

            Intent intent = new Intent(RequestActivity.this, RequestInfoActivity.class);

            intent.putExtra("make", getIntent().getStringExtra("make"));
            intent.putExtra("model", getIntent().getStringExtra("model"));
            intent.putExtra("VIN", getIntent().getStringExtra("VIN"));
            intent.putExtra("year", getIntent().getStringExtra("year"));
            intent.putExtra("description", getIntent().getStringExtra("description"));
            intent.putExtra("timestamp", getIntent().getStringExtra("timestamp"));
            intent.putExtra("type", getIntent().getStringExtra("type"));
            intent.putExtra("userID", getIntent().getStringExtra("userID"));
            intent.putExtra("key", getIntent().getStringExtra("key"));
            intent.putExtra("newRequest", 0);
            intent.putExtra("city", getIntent().getStringExtra("city"));

            startActivity(intent);

            RequestActivity.this.finish();

        } else {

            RequestActivity.this.finish();

        }
    }

    public final static boolean isConnected(Context context) {
        final ConnectivityManager connectivityManager =
                (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        final NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
        return networkInfo != null && networkInfo.isConnected();
    }
}
