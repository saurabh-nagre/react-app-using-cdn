package com.nativecomponent;

import android.util.Log;
import android.widget.ImageView;

import androidx.annotation.NonNull;

import com.bumptech.glide.Glide;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class ImageManager extends SimpleViewManager<ImageView> {

    public ReactApplicationContext mContext;
    public ImageManager(ReactApplicationContext _context){
        Log.d("TAG", "ImageManager: called");
        mContext = _context;
    }

    public static final String className = "MyReactImageView";
    @NonNull
    @Override
    public String getName() {
        return className;
    }

    @NonNull
    @Override
    protected ImageView createViewInstance(@NonNull ThemedReactContext themedReactContext) {
        Log.d("TAG", "image createViewInstance: called ");
        return (new ImageView(mContext));
    }

    @ReactProp(name="source")
    public void setText(ImageView view,String src){
        Log.d("TAG", "setText: called "+ src);
        Glide.with(view.getContext()).load(src).into(view);
    }
}
