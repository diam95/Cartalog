package com.oldmgdn.thisapplication.MainActivity.Fragments.Adapters;

import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.oldmgdn.thisapplication.MainActivity.Fragments.Data.RequestData;
import com.oldmgdn.thisapplication.MainActivity.Fragments.Data.ShopData;
import com.oldmgdn.thisapplication.MainActivity.Fragments.Data.OfferData;
import com.oldmgdn.thisapplication.OfferInfoActivity.OfferInfoActivity;
import com.oldmgdn.thisapplication.R;

import java.util.List;

public class RecyclerViewOffersAdapter extends RecyclerView.Adapter<RecyclerViewOffersAdapter.OfferViewHolder> {


    private List<ShopData> shops_list;
    private Context mContext;
    private List<OfferData> offers_list;
    private List<String> shops_keys_list;

    public RecyclerViewOffersAdapter(Context mContext, List<OfferData> offers_list, List<ShopData> shops_list, List<String> shops_keys_list) {
        this.mContext = mContext;
        this.offers_list = offers_list;
        this.shops_list = shops_list;
        this.shops_keys_list = shops_keys_list;
    }

    @Override
    public RecyclerViewOffersAdapter.OfferViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new RecyclerViewOffersAdapter.OfferViewHolder(LayoutInflater.from(mContext)
                .inflate(R.layout.recyclerview_offer_layout, parent, false));
    }

    @Override
    public void onBindViewHolder(OfferViewHolder holder, final int position) {

        OfferData offerData = offers_list.get(position);

        for (int i = 0; i < shops_list.size(); i++){

            if (offerData.who.equals(shops_keys_list.get(i))){

                ShopData shopData = shops_list.get(i);
                holder.textView_offer.setText(shopData.name + ": " + offerData.offer);
            }

        }

            holder.itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    for (int i = 0; i < shops_list.size(); i++){
                        if (offerData.who.equals(shops_keys_list.get(i))){

                            ShopData shopData = shops_list.get(i);

                            Intent intent = new Intent(mContext, OfferInfoActivity.class);

                            intent.putExtra("SN", shopData.SN);
                            intent.putExtra("lat", shopData.lat);
                            intent.putExtra("lng", shopData.lng);
                            intent.putExtra("monFri", shopData.monFri);
                            intent.putExtra("sat", shopData.sat);
                            intent.putExtra("sun", shopData.sun);
                            intent.putExtra("tel", shopData.tel);
                            intent.putExtra("type", shopData.type);
                            intent.putExtra("name", shopData.name);
                            intent.putExtra("adress", shopData.adress);

                            mContext.startActivity(intent);

                        }
                    }

                }
            });

    }

    @Override
    public int getItemCount() {
        return offers_list.size();
    }

    public static class OfferViewHolder extends RecyclerView.ViewHolder {

        public TextView textView_offer;

        public OfferViewHolder(View itemView) {
            super(itemView);

            textView_offer = itemView.findViewById(R.id.textView_offer);

        }
    }

}