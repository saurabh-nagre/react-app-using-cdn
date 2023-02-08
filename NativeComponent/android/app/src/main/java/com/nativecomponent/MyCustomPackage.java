package com.nativecomponent;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.List;

public class MyCustomPackage implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactApplicationContext) {
        List<NativeModule> modules = new ArrayList<>();
        return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactApplicationContext) {
        List<ViewManager> managers = new ArrayList<>();
        managers.add(new ImageManager(reactApplicationContext));
        managers.add(new ReactTextManager(reactApplicationContext));
        return managers;
    }
}
