package com.oldmgdn.thisapplication.PlacesActivity.Adapters;

import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.oldmgdn.thisapplication.MainActivity.Fragments.Data.ShopData;
import com.oldmgdn.thisapplication.OfferInfoActivity.OfferInfoActivity;
import com.oldmgdn.thisapplication.R;

import java.util.List;

public class RecyclerViewPlacesAdapter extends RecyclerView.Adapter<RecyclerViewPlacesAdapter.PlacesViewHolder> {

    public Context mContext;
    public List<ShopData> shop_list;

    public RecyclerViewPlacesAdapter(List<ShopData> shop_list, Context mContext) {
        this.shop_list = shop_list;
        this.mContext = mContext;
    }

    @Override
    public RecyclerViewPlacesAdapter.PlacesViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new RecyclerViewPlacesAdapter.PlacesViewHolder(LayoutInflater.from(mContext)
                .inflate(R.layout.recyclerview_shops_layout, parent, false));
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerViewPlacesAdapter.PlacesViewHolder placesViewHolder, int i) {

        ShopData shopData = shop_list.get(i);

        placesViewHolder.recyclerView_fragment_list_textView_SN.setText(shopData.SN);
        placesViewHolder.recyclerView_fragment_list_textView_name.setText(shopData.name);

        placesViewHolder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(mContext, OfferInfoActivity.class);

                intent.putExtra("SN",shopData.SN);
                intent.putExtra("lat",shopData.lat);
                intent.putExtra("lng",shopData.lng);
                intent.putExtra("monFri",shopData.monFri);
                intent.putExtra("sat",shopData.sat);
                intent.putExtra("sun",shopData.sun);
                intent.putExtra("tel",shopData.tel);
                intent.putExtra("type",shopData.type);
                intent.putExtra("name",shopData.name);
                intent.putExtra("adress",shopData.adress);

                mContext.startActivity(intent);
            }
        });

    }

    @Override
    public int getItemCount() {
        return shop_list.size();
    }

    public class PlacesViewHolder extends RecyclerView.ViewHolder {

        public TextView recyclerView_fragment_list_textView_SN, recyclerView_fragment_list_textView_name;

        public PlacesViewHolder(@NonNull View itemView) {
            super(itemView);
            recyclerView_fragment_list_textView_SN = itemView.findViewById(R.id.recyclerView_fragment_list_textView_SN);
            recyclerView_fragment_list_textView_name = itemView.findViewById(R.id.recyclerView_fragment_list_textView_name);
        }
    }
}
