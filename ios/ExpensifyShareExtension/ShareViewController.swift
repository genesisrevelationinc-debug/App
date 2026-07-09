import UIKit
import Social
import ReactNativeNavigation

class ShareViewController: UIViewController {
    override func viewDidLoad() {
        // This ensures the React Native view is loaded
        let bridge = RCTBridge(delegate: self, launchOptions: nil)
        let rootView = RCTRootView(bridge: bridge, moduleName: "ExpensifyShareExtension", initialProperties: nil)
        
        // Enable interactive pop gesture for swipe back
        navigationController?.interactivePopGestureRecognizer?.isEnabled = true
        
        self.view = rootView
    }