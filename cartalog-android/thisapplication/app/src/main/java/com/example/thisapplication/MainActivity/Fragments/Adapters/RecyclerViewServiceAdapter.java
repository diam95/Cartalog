package com.oldmgdn.thisapplication.MainActivity.Fragments.Adapters;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.ContextMenu;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.oldmgdn.thisapplication.MainActivity.Fragments.Data.ShopData;
import com.oldmgdn.thisapplication.MainActivity.Fragments.Data.OfferData;
import com.oldmgdn.thisapplication.MainActivity.Fragments.Data.RequestData;
import com.oldmgdn.thisapplication.R;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

import de.hdodenhof.circleimageview.CircleImageView;


public class RecyclerViewServiceAdapter extends RecyclerView.Adapter<RecyclerViewServiceAdapter.RequestHolder> {

    private List<RequestData> request_list;
    private List<String> offers_keys_list;
    private List<String> shops_keys_list;
    private List<ShopData> shops_list;
    private List<OfferData> offers_list;
    private Context mContext;
    private LinearLayoutManager recyclerView_offers_layout_manager;
    private RecyclerViewOffersAdapter recyclerView_offers_adapter;


    // Provide a suitable constructor (depends on the kind of dataset)
    public RecyclerViewServiceAdapter(List<RequestData> request_list, Context mContext) {
        this.request_list = request_list;
        this.mContext = mContext;
    }

    @Override
    public RecyclerViewServiceAdapter.RequestHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new RecyclerViewServiceAdapter.RequestHolder(LayoutInflater.from(mContext)
                .inflate(R.layout.recyclerview_layout, parent, false));
    }

    // Replace the contents of a view (invoked by the layout manager)
    @Override
    public void onBindViewHolder(@NonNull final RequestHolder holder, final int position) {

        RequestData requestData = request_list.get(position);

        if (requestData.image != null) {
            Picasso.get().load(requestData.image).into(holder.recyclerView_circleImageView);
        }
        holder.recyclerView_TextView_marka.setText("Автомобиль: " + requestData.marka);
        holder.recyclerView_TextView_model.setText(requestData.model);
        holder.recyclerView_TextView_descr.setText("Описание: " + requestData.description);
        if (requestData.offers_count != null) {
            holder.recyclerView_TextView_offers_count.setText(String.valueOf(requestData.offers_count));
            holder.recyclerView_TextView_offers_count.setBackground(mContext.getDrawable(R.drawable.item_count));
        }
        holder.recyclerView_TextView_VIN.setText("VIN: " + requestData.VIN);
        holder.recyclerView_TextView_year.setText(requestData.year);

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if (holder.recyclerView_offers.getAdapter()==null){
                    if (requestData.offers_count != null) {

                        offers_list = new ArrayList<>();
                        shops_list = new ArrayList<>();
                        offers_keys_list = new ArrayList<>();
                        shops_keys_list = new ArrayList<>();

                        FirebaseDatabase database = FirebaseDatabase.getInstance();

                        DatabaseReference shopsRef = database.getReference("shops");
                        shopsRef.addChildEventListener(new ChildEventListener() {
                            @Override
                            public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {
                                shops_list.add(dataSnapshot.getValue(ShopData.class));
                                shops_keys_list.add(dataSnapshot.getKey());
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

                        DatabaseReference offersRef = database.getReference("offers").child(requestData.user).child(requestData.key);

                        offersRef.addChildEventListener(new ChildEventListener() {

                            @Override
                            public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                                offers_list.add(dataSnapshot.getValue(OfferData.class));

                                offers_keys_list.add(dataSnapshot.getKey());

                                if (recyclerView_offers_adapter!=null){

                                    holder.recyclerView_offers.setAdapter(null);
                                    recyclerView_offers_adapter = new RecyclerViewOffersAdapter(mContext, offers_list, shops_list, shops_keys_list);
                                    holder.recyclerView_offers.setAdapter(recyclerView_offers_adapter);
                                    recyclerView_offers_adapter.notifyDataSetChanged();
                                }

                            }

                            @Override
                            public void onChildChanged(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                                for (int i = 0; i < offers_list.size(); i++) {

                                    if (offers_keys_list.get(i).equals(dataSnapshot.getKey())) {

                                        offers_list.set(i, dataSnapshot.getValue(OfferData.class));
                                        holder.recyclerView_offers.setAdapter(null);

                                        recyclerView_offers_adapter.notifyDataSetChanged();
                                    }

                                }

                            }

                            @Override
                            public void onChildRemoved(@NonNull DataSnapshot dataSnapshot) {

                                for (int i = 0; i < offers_list.size(); i++) {

                                    if (offers_keys_list.get(i).equals(dataSnapshot.getKey())) {

                                        offers_list.remove(i);
                                        holder.recyclerView_offers.setAdapter(null);

                                        recyclerView_offers_adapter.notifyDataSetChanged();
                                    }

                                }

                            }

                            @Override
                            public void onChildMoved(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

                            }

                            @Override
                            public void onCancelled(@NonNull DatabaseError databaseError) {

                            }
                        });

                        offersRef.addValueEventListener(new ValueEventListener() {
                            @Override
                            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                                holder.recyclerView_offers.setHasFixedSize(true);

                                recyclerView_offers_layout_manager = new LinearLayoutManager(mContext);
                                holder.recyclerView_offers.setLayoutManager(recyclerView_offers_layout_manager);

                                recyclerView_offers_adapter = new RecyclerViewOffersAdapter(mContext, offers_list, shops_list, shops_keys_list);
                                holder.recyclerView_offers.setAdapter(recyclerView_offers_adapter);

                            }

                            @Override
                            public void onCancelled(@NonNull DatabaseError databaseError) {

                            }
                        });

                    } else {
                        Toast.makeText(mContext, "На ваш запрос еще не ответили :(", Toast.LENGTH_SHORT).show();
                    }

                } else {
                    holder.recyclerView_offers.setAdapter(null);
                }


            }
        });

        holder.itemView.setOnCreateContextMenuListener(new View.OnCreateContextMenuListener() {
            @Override
            public void onCreateContextMenu(ContextMenu contextMenu, View view, ContextMenu.ContextMenuInfo contextMenuInfo) {
                contextMenu.add(position, 0, 0, "Изменить");//groupId, itemId, order, title
                contextMenu.add(position, 1, 0, "Удалить");
            }
        });

    }


    @Override
    public int getItemCount() {
        return request_list.size();
    }

    public static class RequestHolder extends RecyclerView.ViewHolder {

        public CircleImageView recyclerView_circleImageView;
        public TextView recyclerView_TextView_marka, recyclerView_TextView_model, recyclerView_TextView_descr, recyclerView_TextView_offers_count, recyclerView_TextView_VIN, recyclerView_TextView_year;
        public RecyclerView recyclerView_offers;

        public RequestHolder(View itemView) {
            super(itemView);
            recyclerView_circleImageView = itemView.findViewById(R.id.recyclerView_circleImageView);
            recyclerView_TextView_marka = itemView.findViewById(R.id.recyclerView_TextView_marka);
            recyclerView_TextView_model = itemView.findViewById(R.id.recyclerView_TextView_model);
            recyclerView_TextView_descr = itemView.findViewById(R.id.recyclerView_TextView_descr);
            recyclerView_TextView_offers_count = itemView.findViewById(R.id.recyclerView_TextView_offers_count);
            recyclerView_TextView_VIN = itemView.findViewById(R.id.recyclerView_TextView_VIN);
            recyclerView_TextView_year = itemView.findViewById(R.id.recyclerView_TextView_year);
            recyclerView_offers = itemView.findViewById(R.id.recyclerView_offers);

        }

    }
}