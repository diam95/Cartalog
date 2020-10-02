package com.oldmgdn.boost.ChooseCarActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SearchView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.oldmgdn.boost.ChooseCarActivity.Adapters.ChooseCarRecyclerViewAdapter;
import com.oldmgdn.boost.EndlessRecyclerViewScrollListener;
import com.oldmgdn.boost.R;
import com.oldmgdn.boost.RequestActivity.RequestActivity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ChooseCarActivity extends AppCompatActivity implements ChooseCarRecyclerViewAdapter.OnNoteListener {

    public RecyclerView carsRecyclerView;
    private ChooseCarRecyclerViewAdapter carsRecyclerViewAdapter;
    private TextView floatingLabel;
    private List<String> data;
    private List<String> data_part;
    private int newRequest;
    private String type;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_choose_car);

        initializeUI();
        setOnClickListeners();

    }

    private void setOnClickListeners() {

    }

    private void initializeUI() {

        newRequest = getIntent().getIntExtra("newRequest", 0);
        type = getIntent().getStringExtra("type");

        floatingLabel = findViewById(R.id.activity_choose_car_floating_label_TextView);
        carsRecyclerView = findViewById(R.id.activity_choose_car_RecyclerView);
        recyclerView();
    }

    private void recyclerView() {

        data = Arrays.asList(getResources().getStringArray(R.array.manufacturers));
        final List<String> data22 = Arrays.asList(getResources().getStringArray(R.array.manufacturerIDS));
        final List<String> letters2 = Arrays.asList(getResources().getStringArray(R.array.letters2));
        final List<String> letters = Arrays.asList(getResources().getStringArray(R.array.letters));
        final List<Integer> resIDS = new ArrayList<>();
        for (int i = 0; i < data22.size(); i++) {
            resIDS.add(getResources().getIdentifier(data22.get(i).toLowerCase(), "drawable", getPackageName()));
        }
        data_part = new ArrayList<>();
        for (int i = 0; i < 12; i++) {

            data_part.add(data.get(i));
        }
        carsRecyclerView.setHasFixedSize(true);
        final LinearLayoutManager linearLayoutManager = new LinearLayoutManager(getApplicationContext(), LinearLayoutManager.VERTICAL, false);
        EndlessRecyclerViewScrollListener scrollListener = new EndlessRecyclerViewScrollListener(linearLayoutManager) {

            @Override
            public void onScrolled(RecyclerView view, int dx, int dy) {
                super.onScrolled(view, dx, dy);

                int lul = linearLayoutManager.findFirstVisibleItemPosition();

                if (lul >= 0) {
                    floatingLabel.setText(letters2.get(lul));
                } else {
                    floatingLabel.setText("");
                }
            }

            @Override
            public void onLoadMore(int page, int totalItemsCount, RecyclerView view) {

                int size = data_part.size();

                for (int i = 0; i < 12; i++) {

                    if (data_part.size() < 126) {

                        data_part.add(data.get(size + i));
                    }
                }

                carsRecyclerView.post(new Runnable() {
                    public void run() {
                        carsRecyclerViewAdapter.notifyItemInserted(data_part.size() - 1);
                    }
                });
            }
        };
        carsRecyclerView.addOnScrollListener(scrollListener);
        carsRecyclerView.setLayoutManager(linearLayoutManager);
        carsRecyclerViewAdapter = new ChooseCarRecyclerViewAdapter(data, getApplicationContext(), resIDS, this, data_part, letters);
        carsRecyclerView.setAdapter(carsRecyclerViewAdapter);

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

                    carsRecyclerViewAdapter.getFilter().filter("");

                } else {

                    carsRecyclerViewAdapter.getFilter().filter(newText);
                }
                return false;
            }
        });
        return true;
    }


    @Override
    public void onNoteClick(int position, List<String> filteredList) {

        String type = getIntent().getStringExtra("type");

        System.out.println(type);

        Intent intent = new Intent(ChooseCarActivity.this, ChooseCarModelActivity.class);
        intent.putExtra("make", filteredList.get(position));
        intent.putExtra("type", type);
        intent.putExtra("newRequest", newRequest);
        intent.putExtra("city", getIntent().getStringExtra("city"));


        if (getIntent().getStringExtra("VIN") != null) {
            intent.putExtra("VIN", getIntent().getStringExtra("VIN"));
        }
        if (getIntent().getStringExtra("year") != null) {
            intent.putExtra("year", getIntent().getStringExtra("year"));
        }
        if (getIntent().getStringExtra("description") != null) {
            intent.putExtra("description", getIntent().getStringExtra("description"));
        }
        if (getIntent().getStringExtra("user") != null) {
            intent.putExtra("user", getIntent().getStringExtra("user"));
        }
        if (getIntent().getStringExtra("key") != null) {
            intent.putExtra("key", getIntent().getStringExtra("key"));
        }
        if (getIntent().getStringExtra("model") != null) {
            intent.putExtra("model", getIntent().getStringExtra("model"));
        }

        startActivity(intent);

        finish();
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();

        String type = getIntent().getStringExtra("type");

        Intent intent = new Intent(ChooseCarActivity.this, RequestActivity.class);
        intent.putExtra("type", type);
        intent.putExtra("newRequest", newRequest);

        if (getIntent().getStringExtra("VIN") != null) {
            intent.putExtra("VIN", getIntent().getStringExtra("VIN"));
        }
        if (getIntent().getStringExtra("year") != null) {
            intent.putExtra("year", getIntent().getStringExtra("year"));
        }
        if (getIntent().getStringExtra("description") != null) {
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

        intent.putExtra("city", getIntent().getStringExtra("city"));

        startActivity(intent);

        ChooseCarActivity.this.finish();
    }

}
