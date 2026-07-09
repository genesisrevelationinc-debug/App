        let bridge = RCTBridge(delegate: self, launchOptions: nil)
        let rootView = RCTRootView(bridge: bridge, moduleName: "ExpensifyShareExtension", initialProperties: nil)
        
        // Allow swipe back gesture to dismiss the share extension
        self.navigationController?.interactivePopGestureRecognizer?.delegate = self
        
        self.view = rootView
    }
    
        return URL(string: "http://localhost:8081/index.bundle?platform=ios")!
    }
}

extension ShareViewController: UIGestureRecognizerDelegate {
    func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer) -> Bool {
        return true
    }
    
    func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
        return true
    }
}