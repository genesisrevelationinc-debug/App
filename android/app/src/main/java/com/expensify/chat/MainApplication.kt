package com.expensify.chat

import android.app.Application
import android.os.Build
import android.content.Context
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import android.app.Application
import android.content.pm.ActivityInfo
import android.content.res.Configuration
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.react.bridge.ReactMarker
import com.facebook.soloader.SoLoader
import java.lang.reflect.Method

import com.expensify.chat.shortcutManagerModule.ShortcutManagerPackage
import com.margelo.nitro.nitrofetch.AutoPrefetcher
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.modules.i18nmanager.I18nUtil
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader
import expo.modules.ApplicationLifecycleDispatcher
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative

class MainApplication : MultiDexApplication(), ReactApplication {
    override val reactHost: ReactHost by lazy {
        getDefaultReactHost(
            context = applicationContext,

  override fun onCreate() {
    super.onCreate()
    
    // Fix for ART crash during JNI bridge invocation on Android 14+
    // Pre-warm the JNI bridge to avoid SIGSEGV in InvokeVirtualOrInterfaceWithVarArgs
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
      try {
        System.setProperty("react.native.enable_bridgeless", "false")
      } catch (e: SecurityException) {
        // Ignore if we can't set the property
      }
    }
    SoLoader.init(this, OpenSourceMergedSoMapping)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      load()
                    add(ExpensifyAppPackage())
                    add(RNTextInputResetPackage())
                    add(NavBarManagerPackage())
                },
        )
    }

    override fun onCreate() {
        super.onCreate()

        // Plaid's LinkActivity calls setRequestedOrientation(PORTRAIT) in its own onCreate(),
        // which forces the UI to portrait even when the device is in landscape. We override it
        // here so Plaid can render in whichever orientation the device is actually in.
        registerActivityLifecycleCallbacks(object : Application.ActivityLifecycleCallbacks {
            override fun onActivityCreated(activity: Activity, savedInstanceState: Bundle?) {
                if (activity.javaClass.name == "com.plaid.internal.link.LinkActivity") {
                    activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED
                }
            }
            override fun onActivityStarted(activity: Activity) {}
            override fun onActivityResumed(activity: Activity) {}
            override fun onActivityPaused(activity: Activity) {}
            override fun onActivityStopped(activity: Activity) {}
            override fun onActivitySaveInstanceState(activity: Activity, outState: Bundle) {}
            override fun onActivityDestroyed(activity: Activity) {}
        })

        ReactFontManager.getInstance().addCustomFont(this, "Custom Emoji Font", R.font.custom_emoji_font)
        ReactFontManager.getInstance().addCustomFont(this, "Expensify New Kansas", R.font.expensify_new_kansas)
        ReactFontManager.getInstance().addCustomFont(this, "Expensify Neue", R.font.expensify_neue)
        ReactFontManager.getInstance().addCustomFont(this, "Expensify Mono", R.font.expensify_mono)

        if (isOnfidoProcess()) {
            return
        }

        // This is the entrypoint for prefetching with `react-native-nitro-fetch`.
        try {
            AutoPrefetcher.prefetchOnStart(this)
        } catch (_: Throwable) {
            System.err.println("Error initializing Nitro `AutoPrefetcher`")
        }

        loadReactNative(this)

        // Force the app to LTR mode.
        val sharedI18nUtilInstance = I18nUtil.instance
        sharedI18nUtilInstance.allowRTL(applicationContext, false)

        // Increase SQLite DB write size
        try {
            val field = CursorWindow::class.java.getDeclaredField("sCursorWindowSize")
            field.isAccessible = true
            field[null] = 100 * 1024 * 1024 //the 100MB is the new size
        } catch (e: Exception) {
            e.printStackTrace()
        }
        ApplicationLifecycleDispatcher.onApplicationCreate(this);
    }

    override fun onConfigurationChanged(newConfig: Configuration) {
        super.onConfigurationChanged(newConfig)
        ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig)
    }

    private fun isOnfidoProcess(): Boolean {
        val pid = Process.myPid()
        val manager = this.getSystemService(ACTIVITY_SERVICE) as ActivityManager

        return manager.runningAppProcesses.any {
            it.pid == pid && it.processName.endsWith(":onfido_process")
        }
    }
}
