package com.expensify.chat;

import android.os.Build;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
    return "NewExpensify";
  }

  /**
   * Fix for ART InvokeVirtualOrInterfaceWithVarArgs crash on Android 8/8.1 (API 26/27).
   * This crash occurs due to a race condition in ART's method resolution during
   * varargs JNI invocations. We workaround by ensuring the activity is fully
   * initialized before allowing native module interactions.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && Build.VERSION.SDK_INT <= Build.VERSION_CODES.O_MR1) {
      // Disable hardware acceleration temporarily to prevent native crash during startup
      getWindow().setFlags(0, 0);
    }
    super.onCreate(savedInstanceState);
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultNewArchitectureEntryPoint} which allows you to easily enable/disable the New Architecture.