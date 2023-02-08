package com.nativecomponent;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.text.ReactTextView;

public class ReactTextManager extends SimpleViewManager<ReactTextView> {

    public ReactApplicationContext mContext;
    public ReactTextManager(ReactApplicationContext _context){
        System.out.println("React text managar called");
        Log.d("TAG", "ReactTextManager: called");
        mContext = _context;
    }

    public static final String className = "MyTextView";
    @NonNull
    @Override
    public String getName() {
        return className;
    }

    @NonNull
    @Override
    protected ReactTextView createViewInstance(@NonNull ThemedReactContext themedReactContext) {
        return (new ReactTextView(mContext));
    }

    @ReactProp(name="text")
    public void setText(ReactTextView view,String str){
        Log.d("TAG", "setText: called "+ str);
        view.setText(str);
    }
}
