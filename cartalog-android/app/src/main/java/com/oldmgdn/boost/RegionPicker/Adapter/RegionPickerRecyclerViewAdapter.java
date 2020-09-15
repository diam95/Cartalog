package com.oldmgdn.boost.RegionPicker.Adapter;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.oldmgdn.boost.MainActivity.MainActivity;
import com.oldmgdn.boost.Objects.RegionObject;
import com.oldmgdn.boost.R;
import com.oldmgdn.boost.RegionPicker.RegionPicker;

import java.util.List;


public class RegionPickerRecyclerViewAdapter extends RecyclerView.Adapter<RegionPickerRecyclerViewAdapter.MyViewHolder> {

    private List<RegionObject> citiesList;
    private Context mContext;
    private boolean restartActivity;

    public static class MyViewHolder extends RecyclerView.ViewHolder {

        public TextView city;

        public MyViewHolder(View v) {
            super(v);
            city = v.findViewById(R.id.city_textView);
        }
    }

    public RegionPickerRecyclerViewAdapter(List<RegionObject> citiesList, Context context, boolean restartActivity) {
        this.citiesList = citiesList;
        this.mContext = context;
        this.restartActivity = restartActivity;
    }

    @Override
    public RegionPickerRecyclerViewAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent,
                                                                           int viewType) {
        return new RegionPickerRecyclerViewAdapter.MyViewHolder(LayoutInflater.from(mContext)
                .inflate(R.layout.activity_region_picker_recyclerview, parent, false));
    }

    @Override
    public void onBindViewHolder(final MyViewHolder holder, final int position) {

        final RegionObject city = citiesList.get(position);
        holder.city.setText(city.name);

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                final String uid = FirebaseAuth.getInstance().getUid();


                AlertDialog.Builder builder1 = new AlertDialog.Builder(mContext);
                builder1.setMessage("Ваш город " + city.name + "?");
                builder1.setCancelable(true);

                builder1.setPositiveButton(
                        "ДА",
                        new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {

                                FirebaseDatabase database = FirebaseDatabase.getInstance();
                                DatabaseReference dbRef = database.getReference("users").child(uid).child("city");
                                dbRef.setValue(city.key).addOnCompleteListener(new OnCompleteListener<Void>() {
                                    @Override
                                    public void onComplete(@NonNull Task<Void> task) {

                                        if (restartActivity){

                                            Intent intent = new Intent(mContext, MainActivity.class);
                                            mContext.startActivity(intent);
                                            ((RegionPicker)mContext).finish();

                                        } else {

                                            ((RegionPicker)mContext).finish();

                                        }
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
        });
    }

    @Override
    public int getItemCount() {

        return citiesList.size();
    }
}

