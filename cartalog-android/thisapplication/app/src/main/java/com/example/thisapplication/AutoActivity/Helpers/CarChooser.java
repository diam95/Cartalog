package com.oldmgdn.thisapplication.AutoActivity.Helpers;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.RelativeLayout;

import com.oldmgdn.thisapplication.R;

import java.util.Arrays;
import java.util.List;


public class CarChooser extends AppCompatActivity {

    private RelativeLayout choose_ford, choose_Honda, choose_Hyundai, choose_Kia, choose_Mazda, choose_Mitsubishi, choose_Nissan, choose_Subaru, choose_Toyota, choose_Lada;
    private Button button_car_chooser_back;
    private AutoCompleteTextView autoCompleteTextView1;
    private String model,description,image,key;
    private String manufacturer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.helper_car_chooser);

        initializeUI();
        getIntentData();
        setOnClickListeners();
        autoCompleteTextView();

    }

    private void getIntentData() {
        description = getIntent().getStringExtra("description");
        image = getIntent().getStringExtra("image");
        key = getIntent().getStringExtra("key");
    }


    private void initializeUI() {
        choose_ford = findViewById(R.id.choose_ford);
        choose_Honda = findViewById(R.id.choose_Honda);
        choose_Hyundai = findViewById(R.id.choose_Hyundai);
        choose_Kia = findViewById(R.id.choose_Kia);
        choose_Mazda = findViewById(R.id.choose_Mazda);
        choose_Mitsubishi = findViewById(R.id.choose_Mitsubishi);
        choose_Nissan = findViewById(R.id.choose_Nissan);
        choose_Subaru = findViewById(R.id.choose_Subaru);
        choose_Toyota = findViewById(R.id.choose_Toyota);
        choose_Lada = findViewById(R.id.choose_Lada);
        button_car_chooser_back = findViewById(R.id.button_car_chooser_back);
        autoCompleteTextView1 = findViewById(R.id.autoCompleteTextView1);
    }

    //Онклики на модели
    private void setOnClickListeners() {
        choose_ford.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(CarChooser.this, CarChooserModel.class);
                intent.putExtra("Manufacturer", "Ford");
                intent.putExtra("description", description);
                intent.putExtra("image", image);
                intent.putExtra("key", key);
                startActivity(intent);
                finish();
            }
        });

        choose_Honda.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(CarChooser.this, CarChooserModel.class);
                intent.putExtra("Manufacturer", "Honda");
                intent.putExtra("description", description);
                intent.putExtra("image", image);
                intent.putExtra("key", key);
                startActivity(intent);
                finish();
            }
        });

        choose_Hyundai.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(CarChooser.this, CarChooserModel.class);
                intent.putExtra("Manufacturer", "Hyundai");
                intent.putExtra("description", description);
                intent.putExtra("image", image);
                intent.putExtra("key", key);
                startActivity(intent);
                finish();
            }
        });

        choose_Kia.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(CarChooser.this, CarChooserModel.class);
                intent.putExtra("Manufacturer", "Kia");
                intent.putExtra("description", description);
                intent.putExtra("image", image);
                intent.putExtra("key", key);
                startActivity(intent);
                finish();
            }
        });

        choose_Mazda.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(CarChooser.this, CarChooserModel.class);
                intent.putExtra("Manufacturer", "Mazda");
                intent.putExtra("description", description);
                intent.putExtra("image", image);
                intent.putExtra("key", key);
                startActivity(intent);
                finish();
            }
        });

        choose_Mitsubishi.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(CarChooser.this, CarChooserModel.class);
                intent.putExtra("Manufacturer", "Mitsubishi");
                intent.putExtra("description", description);
                intent.putExtra("image", image);
                intent.putExtra("key", key);
                startActivity(intent);
                finish();
            }
        });

        choose_Nissan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(CarChooser.this, CarChooserModel.class);
                intent.putExtra("Manufacturer", "Nissan");
                intent.putExtra("description", description);
                intent.putExtra("image", image);
                intent.putExtra("key", key);
                startActivity(intent);
                finish();
            }
        });

        choose_Subaru.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(CarChooser.this, CarChooserModel.class);
                intent.putExtra("Manufacturer", "Subaru");
                intent.putExtra("description", description);
                intent.putExtra("image", image);
                intent.putExtra("key", key);
                startActivity(intent);
                finish();
            }
        });

        choose_Toyota.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(CarChooser.this, CarChooserModel.class);
                intent.putExtra("Manufacturer", "toyota");
                intent.putExtra("description", description);
                intent.putExtra("image", image);
                intent.putExtra("key", key);
                startActivity(intent);
                finish();
            }
        });

        choose_Lada.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(CarChooser.this, CarChooserModel.class);
                intent.putExtra("Manufacturer", "Лада");
                intent.putExtra("description", description);
                intent.putExtra("image", image);
                intent.putExtra("key", key);
                startActivity(intent);
                finish();
            }
        });

        button_car_chooser_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                                finish();
            }
        });

    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        finish();
    }

    //Поиск модели с аутокоплитом. Онкликлистенер тут
    private void autoCompleteTextView() {
        int layoutItemId = android.R.layout.simple_dropdown_item_1line;
        String[] carArr = getResources().getStringArray(R.array.all_models);
        List<String> carList = Arrays.asList(carArr);
        final ArrayAdapter<String> adapter = new ArrayAdapter<>(this, layoutItemId, carList);
        autoCompleteTextView1.setAdapter(adapter);

        autoCompleteTextView1.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

                model = autoCompleteTextView1.getAdapter().getItem(position).toString();
                String[] isbnParts = model.split(" ");
                model = " ";
                manufacturer = isbnParts[0];

                if (manufacturer.equals("Land")){
                    manufacturer = manufacturer + " " + isbnParts[1];
                    for (int i = 2; i < isbnParts.length; i++) {
                        model = model + " " + isbnParts[i];
                    }

                    Intent intent = new Intent(CarChooser.this, YearChooser.class);
                    intent.putExtra("manufacturer", manufacturer);
                    intent.putExtra("model", model);
                    intent.putExtra("description", description);
                    intent.putExtra("image", image);
                    intent.putExtra("key", key);
                    startActivity(intent);
                }

                    else for (int i = 1; i < isbnParts.length; i++) {
                        model = model + " " + isbnParts[i];
                    }

                Intent intent = new Intent(CarChooser.this, YearChooser.class);
                intent.putExtra("manufacturer", manufacturer);
                intent.putExtra("description", description);
                intent.putExtra("image", image);
                intent.putExtra("key", key);
                intent.putExtra("model", model);
                startActivity(intent);

            }
        });
    }

}
