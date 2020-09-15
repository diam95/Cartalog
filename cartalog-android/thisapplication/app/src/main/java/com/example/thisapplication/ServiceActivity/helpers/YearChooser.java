package com.oldmgdn.thisapplication.ServiceActivity.helpers;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.oldmgdn.thisapplication.ServiceActivity.ServiceActivity;
import com.oldmgdn.thisapplication.R;

public class YearChooser extends AppCompatActivity {

    public String model, manufacturer,description,image,key;
    public TextView textView_manufacturer, textView_model;
    public Spinner year_spinner;
    public Button button_ok, button_year_chooser_back;
    public EditText editText_VIN;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.helper_year_chooser);

        initializeUI();

        getIntentData();

        cardView();

        setOnClickListeners();

    }


    private void initializeUI() {
        textView_manufacturer = findViewById(R.id.textView_manufacturer);
        textView_model = findViewById(R.id.textView_model);
        year_spinner = findViewById(R.id.year_spinner);
        button_ok = findViewById(R.id.button_ok);
        editText_VIN = findViewById(R.id.editText_VIN);
        button_year_chooser_back = findViewById(R.id.button_year_chooser_back);
    }

    public void getIntentData() {
        manufacturer = getIntent().getStringExtra("manufacturer");
        model = getIntent().getStringExtra("model");
        model= model.trim();
        description = getIntent().getStringExtra("description");
        image = getIntent().getStringExtra("image");
        key = getIntent().getStringExtra("key");
    }

    public void cardView() {
        //textView_manufacturer.setText(manufacturer + ",");
        textView_model.setText(manufacturer + " " + model);
        //Toast.makeText(this,manufacturer + "8" + model, Toast.LENGTH_SHORT).show();
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
                R.array.yars, R.layout.spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        year_spinner.setAdapter(adapter);
    }

    private void setOnClickListeners() {
        button_ok.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (manufacturer == null | model == null | year_spinner.getSelectedItem().toString() == null | editText_VIN.getText().toString().equals("")) {
                    Toast.makeText(YearChooser.this, "Исправьте ошибки!", Toast.LENGTH_SHORT).show();
                } else {
                    Intent intent = new Intent(YearChooser.this, ServiceActivity.class);
                    intent.putExtra("manufacturer", manufacturer);
                    intent.putExtra("model", model);
                    intent.putExtra("year", year_spinner.getSelectedItem().toString());
                    intent.putExtra("VIN", editText_VIN.getText().toString());
                    intent.putExtra("description", description);
                    intent.putExtra("image", image);
                    intent.putExtra("key", key);
                    startActivity(intent);
                    finish();
                }
            }
        });

        button_year_chooser_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(YearChooser.this, CarChooser.class);
                intent.putExtra("description", description);
                intent.putExtra("image", image);
                intent.putExtra("key", key);
                startActivity(intent);
                finish();
            }
        });

    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Intent intent = new Intent(YearChooser.this, CarChooser.class);
        intent.putExtra("description", description);
        intent.putExtra("image", image);
        intent.putExtra("key", key);
        startActivity(intent);
        finish();

    }


}
