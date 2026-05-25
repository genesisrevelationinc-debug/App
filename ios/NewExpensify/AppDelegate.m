#import "AppDelegate.h"

#ifdef FB_SONARKIT_ENABLED
#import <React/RCTSonarKit.h>
#endif

- (BOOL)application:(UIApplication *)application
continueUserActivity:(nonnull NSUserActivity *)userActivity
          restorationHandler:(NSArray<id<UIUserActivityRestoring>> * _Nullable)restorationHandler
{
  return [super application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
}

- (void)startObserving
{
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(appWillEnterForeground:)
                                             name:UIApplicationWillEnterForegroundNotification
                                             object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(appDidBecomeActive:)
                                             name:UIApplicationDidReceive
                                             object:nil];
}

- (void)appDidBecomeActive:(NSNotification *)notification
{
    [self fetchReport];
}

- (void)appWillEnterForeground:(NSNotification *)notification
{
    // When the app is going to the foreground, we want to avoid creating a new