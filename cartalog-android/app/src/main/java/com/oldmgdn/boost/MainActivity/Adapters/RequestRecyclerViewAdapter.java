package com.oldmgdn.boost.MainActivity.Adapters;

import android.content.Context;
import android.content.Intent;
import android.view.ContextMenu;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.oldmgdn.boost.R;
import com.oldmgdn.boost.Objects.RequestObject;
import com.oldmgdn.boost.RequestActivity.RequestActivity;
import com.oldmgdn.boost.RequestInfoActivity.RequestInfoActivity;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class RequestRecyclerViewAdapter extends RecyclerView.Adapter<RequestRecyclerViewAdapter.MyViewHolder> {

    private List<RequestObject> mDataset;
    private Context mContext;
    private String city;

    public Context getContext() {
        return mContext;
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder {

        public TextView auto, descr, offers_count, timeTextView;
        public ImageView imageView;
        public CardView cardView;

        public MyViewHolder(View v) {
            super(v);
            auto = v.findViewById(R.id.request_RecyclerView_auto);
            descr = v.findViewById(R.id.request_RecyclerView_descr);
            imageView = v.findViewById(R.id.request_RecyclerView_ImageView);
            offers_count = v.findViewById(R.id.request_RecyclerView_offers_count);
            cardView = v.findViewById(R.id.request_RecyclerView_offers_count_CardView);
            timeTextView = v.findViewById(R.id.request_RecyclerView_time_TextView);
        }
    }

    public RequestRecyclerViewAdapter(List<RequestObject> myDataset, Context myContext, String city) {
        this.mDataset = myDataset;
        this.mContext = myContext;
        this.city = city;
    }

    @Override
    public RequestRecyclerViewAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent,
                                                                      int viewType) {
        return new RequestRecyclerViewAdapter.MyViewHolder(LayoutInflater.from(mContext)
                .inflate(R.layout.request_recyclerview, parent, false));
    }

    @Override
    public void onBindViewHolder(final MyViewHolder holder, final int position) {

        final RequestObject requestObject = mDataset.get(position);

        holder.auto.setText(requestObject.make + " " + requestObject.model + ", " + requestObject.year);
        holder.descr.setText(requestObject.description);

        Date date = new Date(-requestObject.timestamp);

        String dateString = DateFormat.getDateInstance(SimpleDateFormat.MEDIUM, new Locale("ru")).format(date).substring(0,7);

        holder.timeTextView.setText(dateString);


        if (requestObject.offersCount != 0) {
            holder.cardView.setVisibility(View.VISIBLE);
            holder.offers_count.setText("Ответы: " + requestObject.offersCount);
        } else {
            holder.cardView.setVisibility(View.INVISIBLE);
        }

        if (requestObject.type.equals("autoservice")) {
            holder.imageView.setImageResource(R.drawable.ic_cog);
        } else {
            holder.imageView.setImageResource(R.drawable.ic_search);
        }

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(getContext(), RequestInfoActivity.class);

                intent.putExtra("make", requestObject.make);
                intent.putExtra("model", requestObject.model);
                intent.putExtra("VIN", requestObject.VIN);
                intent.putExtra("year", requestObject.year);
                intent.putExtra("description", requestObject.description);
                intent.putExtra("timestamp", requestObject.timestamp);
                intent.putExtra("type", requestObject.type);
                intent.putExtra("userID", requestObject.userID);
                intent.putExtra("key", requestObject.key);
                intent.putExtra("newRequest", 0);
                intent.putExtra("city", city);
                intent.putExtra("from", "request");

                getContext().startActivity(intent);

            }
        });

        holder.itemView.setOnCreateContextMenuListener(new View.OnCreateContextMenuListener() {
            @Override
            public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {

                menu.add(0, v.getId(), 0, "Изменить").setOnMenuItemClickListener(new MenuItem.OnMenuItemClickListener() {
                    @Override
                    public boolean onMenuItemClick(MenuItem item) {

                        Intent intent = new Intent(getContext(), RequestActivity.class);

                        intent.putExtra("make", requestObject.make);
                        intent.putExtra("model", requestObject.model);
                        intent.putExtra("VIN", requestObject.VIN);
                        intent.putExtra("year", requestObject.year);
                        intent.putExtra("description", requestObject.description);
                        intent.putExtra("timestamp", requestObject.timestamp);
                        intent.putExtra("type", requestObject.type);
                        intent.putExtra("userID", requestObject.userID);
                        intent.putExtra("key", requestObject.key);
                        intent.putExtra("newRequest", 0);
                        intent.putExtra("offersCount", 0);
                        intent.putExtra("city", city);

                        getContext().startActivity(intent);

                        return false;
                    }
                });
                menu.add(0, v.getId(), 0, "Удалить").setOnMenuItemClickListener(new MenuItem.OnMenuItemClickListener() {
                    @Override
                    public boolean onMenuItemClick(MenuItem item) {


                        FirebaseDatabase db = FirebaseDatabase.getInstance();
                        DatabaseReference dbRef = db.getReference("requests").child(city).child(requestObject.type).child(requestObject.key);
                        DatabaseReference dbRef2 = db.getReference("messages").child(city).child(requestObject.type).child(requestObject.key);

                        dbRef.removeValue();
                        dbRef2.removeValue();

                        return false;
                    }
                });

            }
        });


    }

    @Override
    public int getItemCount() {
        return mDataset.size();
    }
}
