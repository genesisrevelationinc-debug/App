package com.expensify.chat;

import android.os.Build;
import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
  @Override
  public void onCreate() {
    super.onCreate();
    // Fix for ART InvokeVirtualOrInterfaceWithVarArgs crash on Android 8/8.1 (API 26/27)
    // This works around a known ART bug where varargs JNI calls can cause SIGSEGV
    // when the class hierarchy is being resolved concurrently.
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && Build.VERSION.SDK_INT <= Build.VERSION_CODES.O_MR1) {
      // Force class loading to happen synchronously to avoid the race condition
      System.setProperty("java.vm.usejit", "false");
    }
    
    SoLoader.init(this, /* native exopackage */ false);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.