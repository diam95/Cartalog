package com.oldmgdn.thisapplication.AutoActivity.Adapters;

import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.oldmgdn.thisapplication.AutoActivity.AddAutoActivity;
import com.oldmgdn.thisapplication.AutoActivity.Helpers.CarChooserModel;
import com.oldmgdn.thisapplication.AutoActivity.Helpers.YearChooser;
import com.oldmgdn.thisapplication.R;

/**
 * Created by old on 11.05.2018.
 */

public class CarChooserModelAdapter extends RecyclerView.Adapter<CarChooserModelAdapter.CarChooserModelViewHolder> {

    public String[] mDataset;
    public Context mContext;
    public String manufacturer, description, key, image;
    private String model2;

    public CarChooserModelAdapter(String[] mDataset, Context context, String manufacturer, String key, String description, String image) {
        this.mDataset = mDataset;
        this.mContext = context;
        this.manufacturer = manufacturer;
        this.description = description;
        this.key = key;
        this.image = image;
    }

    @NonNull
    @Override
    public CarChooserModelViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new CarChooserModelViewHolder(LayoutInflater.from(parent.getContext())
                .inflate(R.layout.car_chooser_model_recyclerview_layout, parent, false));
    }

    @Override
    public void onBindViewHolder(@NonNull final CarChooserModelViewHolder holder, final int position) {
        final String model = mDataset[position];

        holder.textview_carModel.setText(model);

        //Онклик на модели
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Toast.makeText(mContext,model,Toast.LENGTH_SHORT).show();
                String[] isbnParts = model.split(
                        " ");
                model2 = isbnParts[1];
                for (int i = 2; i < isbnParts.length; i++) {
                    model2 = model2 + " " + isbnParts[i];
                }
                Intent intent = new Intent(mContext, YearChooser.class);
                intent.putExtra("model", model2);
                intent.putExtra("description", description);
                intent.putExtra("key", key);
                intent.putExtra("image", image);
                intent.putExtra("manufacturer", manufacturer);
                ((CarChooserModel)mContext).finish();
                mContext.startActivity(intent);

            }
        });

    }


    @Override
    public int getItemCount() {
        return mDataset.length;
    }


    class CarChooserModelViewHolder extends RecyclerView.ViewHolder {
        TextView textview_carModel;

        public CarChooserModelViewHolder(View itemView) {
            super(itemView);
            textview_carModel = itemView.findViewById(R.id.textview_carModel);
        }
    }
}


