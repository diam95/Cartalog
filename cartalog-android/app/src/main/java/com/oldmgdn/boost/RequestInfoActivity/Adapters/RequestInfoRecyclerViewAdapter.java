package com.oldmgdn.boost.RequestInfoActivity.Adapters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.oldmgdn.boost.ChatWithVendor.ChatWithVendorActivity;
import com.oldmgdn.boost.DigestActivity.DigestDetailedActivity;
import com.oldmgdn.boost.Objects.RequestObject;
import com.oldmgdn.boost.Objects.РartnerObject;
import com.oldmgdn.boost.R;
import com.oldmgdn.boost.RequestInfoActivity.RequestInfoActivity;

import java.util.ArrayList;
import java.util.List;

public class RequestInfoRecyclerViewAdapter extends RecyclerView.Adapter<RequestInfoRecyclerViewAdapter.MyViewHolder> {

    public List<String> vendorIDs;
    public RequestObject requestObject;
    public Context mContext;
    public РartnerObject рartnerObject;
    public String city;


    public static class MyViewHolder extends RecyclerView.ViewHolder {

        public TextView vendor, lastmessage, timeTextView;
        public ImageView imageView;
        public CardView newMessage;

        public MyViewHolder(View v) {
            super(v);
            vendor = v.findViewById(R.id.offer_recyclerview_vendor);
            imageView = v.findViewById(R.id.offer_recyclerview_vendor_ImageView);
            lastmessage = v.findViewById(R.id.offer_recyclerview_last_message);
            timeTextView = v.findViewById(R.id.offer_recyclerview_time);
            newMessage = v.findViewById(R.id.offer_RecyclerView_offers_count_CardView);
        }
    }

    public RequestInfoRecyclerViewAdapter(Context myContext, RequestObject requestObject, List<String> vendorIDs, String city) {

        this.mContext = myContext;
        this.requestObject = requestObject;
        this.vendorIDs = vendorIDs;
        this.city = city;
    }

    @Override
    public RequestInfoRecyclerViewAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        return new RequestInfoRecyclerViewAdapter.MyViewHolder(LayoutInflater.from(mContext)
                .inflate(R.layout.offer_recyclerview_layout, parent, false));
    }

    @Override
    public void onBindViewHolder(final RequestInfoRecyclerViewAdapter.MyViewHolder holder, final int position) {

        final Intent intent2 = new Intent(mContext, ChatWithVendorActivity.class);
        final Intent intent = new Intent(mContext, DigestDetailedActivity.class);

        FirebaseDatabase firebaseDatabase = FirebaseDatabase.getInstance();

        final List<String> requestKeys = new ArrayList<>();

        final String vendorID = vendorIDs.get(position);
        DatabaseReference partnersRef = firebaseDatabase.getReference("partners").child(city).child(requestObject.type).child(vendorID);

        partnersRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                рartnerObject = dataSnapshot.getValue(РartnerObject.class);

                intent2.putExtra("make", requestObject.make);
                intent2.putExtra("model", requestObject.model);
                intent2.putExtra("VIN", requestObject.VIN);
                intent2.putExtra("year", requestObject.year);
                intent2.putExtra("description", requestObject.description);
                intent2.putExtra("timestamp", requestObject.timestamp);
                intent2.putExtra("type", requestObject.type);
                intent2.putExtra("userID", requestObject.userID);
                intent2.putExtra("key", requestObject.key);
                intent2.putExtra("newRequest", 0);
                intent2.putExtra("vendorID", vendorID);
                intent2.putExtra("vendorName", рartnerObject.name);
                intent2.putExtra("city", city);

                intent2.putExtra("address", рartnerObject.address);
                intent2.putExtra("coord1", рartnerObject.coord1);
                intent2.putExtra("coord2", рartnerObject.coord2);
                intent2.putExtra("fri", рartnerObject.fri);
                intent2.putExtra("mon", рartnerObject.mon);
                intent2.putExtra("name", рartnerObject.name);
                intent2.putExtra("sat", рartnerObject.sat);
                intent2.putExtra("sun", рartnerObject.sun);
                intent2.putExtra("tel", рartnerObject.tel);
                intent2.putExtra("thu", рartnerObject.thu);
                intent2.putExtra("tue", рartnerObject.tue);
                intent2.putExtra("uid", рartnerObject.uid);
                intent2.putExtra("wed", рartnerObject.wed);
                intent2.putExtra("tue", рartnerObject.tue);

                intent.putExtra("address", рartnerObject.address);
                intent.putExtra("coord1", рartnerObject.coord1);
                intent.putExtra("coord2", рartnerObject.coord2);
                intent.putExtra("fri", рartnerObject.fri);
                intent.putExtra("mon", рartnerObject.mon);
                intent.putExtra("name", рartnerObject.name);
                intent.putExtra("sat", рartnerObject.sat);
                intent.putExtra("sun", рartnerObject.sun);
                intent.putExtra("tel", рartnerObject.tel);
                intent.putExtra("thu", рartnerObject.thu);
                intent.putExtra("tue", рartnerObject.tue);
                intent.putExtra("uid", рartnerObject.uid);
                intent.putExtra("wed", рartnerObject.wed);
                intent.putExtra("tue", рartnerObject.tue);

                String vendorName = рartnerObject.name;
                holder.vendor.setText(vendorName);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

        final DatabaseReference messagesRef = firebaseDatabase.getReference("messages").child(city).child(requestObject.type).child(requestObject.key).child(vendorID);

        messagesRef.orderByKey().limitToLast(1).addChildEventListener(new ChildEventListener() {
            @Override
            public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                requestKeys.add(dataSnapshot.getKey());

                String lastMessage = dataSnapshot.child("message").getValue().toString();

                int viewType = Integer.valueOf(dataSnapshot.child("viewType").getValue().toString());

                int newAppMessage = Integer.valueOf(dataSnapshot.child("newAppMessage").getValue().toString());

                if (newAppMessage == 1) {
                    holder.newMessage.setVisibility(View.VISIBLE);
                } else {
                    holder.newMessage.setVisibility(View.INVISIBLE);
                }

                if (lastMessage.length() > 20) {

                    if (viewType == 1 || viewType == 3) {
                        holder.lastmessage.setText(R.string.image);
                    } else {

                        String lastMessagePart = lastMessage.substring(0, 20);
                        holder.lastmessage.setText(lastMessagePart + "...");
                    }

                } else {
                    holder.lastmessage.setText(lastMessage);
                }


                holder.timeTextView.setText(dataSnapshot.child("time").getValue().toString());

            }

            @Override
            public void onChildChanged(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

            }

            @Override
            public void onChildRemoved(@NonNull DataSnapshot dataSnapshot) {

            }

            @Override
            public void onChildMoved(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                ((RequestInfoActivity) mContext).finish();
                mContext.startActivity(intent2);

            }
        });

        holder.imageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                mContext.startActivity(intent);

            }
        });

    }

    @Override
    public int getItemCount() {
        return vendorIDs.size();
    }
}