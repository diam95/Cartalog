package com.oldmgdn.thisapplication.AutoActivity.Helpers;

import android.content.Intent;
import android.content.res.Resources;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.Button;

import com.oldmgdn.thisapplication.AutoActivity.Adapters.CarChooserModelAdapter;
import com.oldmgdn.thisapplication.R;

public class CarChooserModel extends AppCompatActivity {

    private RecyclerView mRecyclerView;
    private LinearLayoutManager mLayoutManager;
    private RecyclerView.Adapter mAdapter;
    private String manufacturer, description, image, key;
    private Button button_car_chooser_model_back;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.helper_car_chooser_model);

        initialiseUI();

        getIntentData();

        recyclerView();

        setOnClickListeners();

    }

    private void setOnClickListeners() {
        button_car_chooser_model_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(CarChooserModel.this, CarChooser.class);
                intent.putExtra("description", description);
                intent.putExtra("image", image);
                intent.putExtra("key", key);
                startActivity(intent);
                finish();
            }
        });
    }

    private void initialiseUI() {
        button_car_chooser_model_back = findViewById(R.id.button_car_chooser_model_back);
    }

    public void getIntentData() {
        manufacturer = getIntent().getStringExtra("Manufacturer");
        description = getIntent().getStringExtra("description");
        image = getIntent().getStringExtra("image");
        key = getIntent().getStringExtra("key");
    }

    private void recyclerView() {
        mRecyclerView = findViewById(R.id.my_recycler_view);
        mRecyclerView.setHasFixedSize(true);

        mLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLayoutManager);

        Resources res = getResources();

        if (manufacturer != null) {
            switch (manufacturer) {

                case "Ford":
                    String[] myDataset = res.getStringArray(R.array.Ford);
                    mAdapter = new CarChooserModelAdapter(myDataset, this, manufacturer, key, description, image);
                    mRecyclerView.setAdapter(mAdapter);
                    break;

                case "Honda":
                    String[] HondaDataset = res.getStringArray(R.array.Honda);
                    mAdapter = new CarChooserModelAdapter(HondaDataset, this, manufacturer, key, description, image);
                    mRecyclerView.setAdapter(mAdapter);
                    break;

                case "Hyundai":
                    String[] HyundaiDataset = res.getStringArray(R.array.Hyundai);
                    mAdapter = new CarChooserModelAdapter(HyundaiDataset, this, manufacturer, key, description, image);
                    mRecyclerView.setAdapter(mAdapter);
                    break;

                case "Kia":
                    String[] KiaDataset = res.getStringArray(R.array.Kia);
                    mAdapter = new CarChooserModelAdapter(KiaDataset, this, manufacturer, key, description, image);
                    mRecyclerView.setAdapter(mAdapter);
                    break;

                case "Mazda":
                    String[] MazdaDataset = res.getStringArray(R.array.Mazda);
                    mAdapter = new CarChooserModelAdapter(MazdaDataset, this, manufacturer, key, description, image);
                    mRecyclerView.setAdapter(mAdapter);
                    break;

                case "Mitsubishi":
                    String[] MitsubishiDataset = res.getStringArray(R.array.Mitsubishi);
                    mAdapter = new CarChooserModelAdapter(MitsubishiDataset, this, manufacturer, key, description, image);
                    mRecyclerView.setAdapter(mAdapter);
                    break;

                case "Nissan":
                    String[] NissanDataset = res.getStringArray(R.array.Nissan);
                    mAdapter = new CarChooserModelAdapter(NissanDataset, this, manufacturer, key, description, image);
                    mRecyclerView.setAdapter(mAdapter);
                    break;

                case "Subaru":
                    String[] SubaruDataset = res.getStringArray(R.array.Subaru);
                    mAdapter = new CarChooserModelAdapter(SubaruDataset, this, manufacturer, key, description, image);
                    mRecyclerView.setAdapter(mAdapter);
                    break;

                case "toyota":
                    String[] ToyotaDataset = res.getStringArray(R.array.Toyota);
                    mAdapter = new CarChooserModelAdapter(ToyotaDataset, this, manufacturer, key, description, image);
                    mRecyclerView.setAdapter(mAdapter);
                    break;

                case "Лада":
                    String[] ЛадаDataset = res.getStringArray(R.array.Лада);
                    mAdapter = new CarChooserModelAdapter(ЛадаDataset, this, manufacturer, key, description, image);
                    mRecyclerView.setAdapter(mAdapter);
                    break;
            }
        }
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Intent intent = new Intent(CarChooserModel.this, CarChooser.class);
        intent.putExtra("description", description);
        intent.putExtra("image", image);
        intent.putExtra("key", key);
        startActivity(intent);
        finish();

    }

}
