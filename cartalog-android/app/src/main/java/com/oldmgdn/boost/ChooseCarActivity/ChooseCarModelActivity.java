package com.oldmgdn.boost.ChooseCarActivity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SearchView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

import com.oldmgdn.boost.ChooseCarActivity.Adapters.ChooseCarModelRecyclerViewAdapter;
import com.oldmgdn.boost.R;
import com.oldmgdn.boost.RequestActivity.RequestActivity;

import java.util.Arrays;
import java.util.List;

public class ChooseCarModelActivity extends AppCompatActivity implements ChooseCarModelRecyclerViewAdapter.OnNoteListener {

    public RecyclerView modelsRecyclerView;
    public ChooseCarModelRecyclerViewAdapter modelsRecyclerViewAdapter;
    public String make;
    public String makeResId;
    private String type;
    private int newRequest;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_choose_car_model);

        initializeUI();

    }

    private void initializeUI() {

        modelsRecyclerView = findViewById(R.id.activity_choose_car_model_RecyclerView);

        make = getIntent().getStringExtra("make");
        type = getIntent().getStringExtra("type");
        newRequest = getIntent().getIntExtra("newRequest", 0);

        makeResId = make;

        switch (make) {
            case "Лада":
                makeResId = "Lada";
                break;
            case "Iran Khordo":
                makeResId = "Irankhordo";
                break;
            case "Land Rover":
                makeResId = "Landrover";
                break;
            case "Mercedes-Benz":
                makeResId = "Mercedesbenz";
                break;
            case "Rolls-Royce":
                makeResId = "Rollsroyce";
                break;
            case "Аурус":
                makeResId = "Aurus";
                break;
            case "ГАЗ":
                makeResId = "Gaz";
                break;
            case "ЗАЗ":
                makeResId = "ZAZ";
                break;
            case "ИЖ":
                makeResId = "Izh";
                break;
            case "Луаз":
                makeResId = "Luaz";
                break;
            case "Москвич":
                makeResId = "Moskvich";
                break;
            case "ТагАЗ":
                makeResId = "Tagaz";
                break;
            case "УАЗ":
                makeResId = "Uaz";
                break;
        }

        getSupportActionBar().setTitle(make);
        recyclerView();
    }


    private void recyclerView() {

        int resID = getResources().getIdentifier(makeResId.replaceAll("\\s+", ""), "array", getPackageName());
        List<String> data = Arrays.asList(getResources().getStringArray(resID));
        modelsRecyclerView.setHasFixedSize(true);
        LinearLayoutManager linearLayoutManager2 = new LinearLayoutManager(getApplicationContext(), LinearLayoutManager.VERTICAL, false);
        modelsRecyclerView.setLayoutManager(linearLayoutManager2);
        modelsRecyclerViewAdapter = new ChooseCarModelRecyclerViewAdapter(data, getApplicationContext(), this);
        modelsRecyclerView.setAdapter(modelsRecyclerViewAdapter);


    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.example_menu, menu);

        MenuItem searchItem = menu.findItem(R.id.action_search);
        SearchView searchView = (SearchView) searchItem.getActionView();

        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {

                if (newText.length() == 0) {

                    modelsRecyclerViewAdapter.getFilter().filter("");

                } else {

                    modelsRecyclerViewAdapter.getFilter().filter(newText);
                }
                return false;
            }
        });
        return true;
    }

    @Override
    public void onNoteClick(int position, List<String> filteredList) {

        String model = filteredList.get(position);

        Intent intent = new Intent(ChooseCarModelActivity.this, RequestActivity.class);
        intent.putExtra("make", make);
        intent.putExtra("type", type);
        intent.putExtra("model", model);
        intent.putExtra("newRequest", newRequest);
        intent.putExtra("city", getIntent().getStringExtra("city"));

        if (getIntent().getStringExtra("VIN")!=null){
            intent.putExtra("VIN", getIntent().getStringExtra("VIN"));
        }
        if (getIntent().getStringExtra("year")!=null){
            intent.putExtra("year", getIntent().getStringExtra("year"));
        }
        if (getIntent().getStringExtra("description")!=null){
            intent.putExtra("description", getIntent().getStringExtra("description"));
        }
        if (getIntent().getStringExtra("user") != null) {
            intent.putExtra("user", getIntent().getStringExtra("user"));
        }
        if (getIntent().getStringExtra("key") != null) {
            intent.putExtra("key", getIntent().getStringExtra("key"));
        }

        startActivity(intent);

        ChooseCarModelActivity.this.finish();
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();

        Intent intent = new Intent(ChooseCarModelActivity.this, ChooseCarActivity.class);
        intent.putExtra("type", type);
        intent.putExtra("newRequest", newRequest);
        intent.putExtra("city", getIntent().getStringExtra("city"));

        if (getIntent().getStringExtra("VIN")!=null){
            intent.putExtra("VIN", getIntent().getStringExtra("VIN"));
        }
        if (getIntent().getStringExtra("year")!=null){
            intent.putExtra("year", getIntent().getStringExtra("year"));
        }
        if (getIntent().getStringExtra("description")!=null){
            intent.putExtra("description", getIntent().getStringExtra("description"));
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

        ChooseCarModelActivity.this.finish();
    }
}
