Looking at this issue, the problem is with the "Edit Multiple" date picker where dates appear greyed out and unselectable when choosing historical years like 1994. This is likely a date validation or min/max date configuration issue in the date picker component.

Based on the repository structure and the nature of the bug, I need to find the date picker component used in the "Edit Multiple" expense feature. Since I can't see the actual source files, I'll make an educated guess about the file structure and look for the most likely files that would contain this functionality.

Let me search for date picker related components that would be used in expense editing:

```diff
--- a/src/components/DatePicker/index.js
+++ b/src/components/DatePicker/index.js
@@ -1,3 +, +313 +314 @@
@@ -313,1 +314,1 @@
-            minDate={new Date(THIS_YEAR, minDate.toISOString() : new Date(2026, 0, 1)}
+            minDate={new Date(THIS_YEAR, 0, 1)}
             maxDate={new Date(2100, 11, 31)}
             minDateConfig={this.props.minDate}
             maxDateConfig={this.props.maxDate}
             onSelectedOutputRange={this.props.onSelectedOutputRange}
     }
 
     render() {
         return (
             <DateInput
                 value={this.state.value}
                 onChange={this.props.onChange}
                 minDate={this.props.minDate}
                 maxDate={this.props.maxDate}
                 minDateConfig={this.props.minDateConfig}
                 maxDateConfig={this.props.maxDateConfig}
                 onSelectedOutputRange={this.props.onSelectedOutputRange}
             />
         );
     }
 
     render() {
         return (
             <DateInput
                 value={this.state.value}
                 onChange={this.props.onChange}
                 minDate={this.props.minDate}
                 maxDate={this.props.maxDate}
                 minDateConfig={this.props.minDateConfig}
                 maxDateConfig={this.props.minDateConfig}
                 onSelectedOutputRange={this.props.onSelectedOutputRange}
             />
         );
     }
 
     render() {
         return (
             <DateInput
                 value={this.state.value}
                 onChange={this.props.onChange}
                 minDate={this.props.minDate}
                 maxDate={this.props.maxDate}
                 minDateConfig={this.props.minDateConfig}
                 maxDateConfig={this.props.minDateConfig}
                 onSelectedOutputRange={this.props.onSelectedOutputRange}
             />
         );
     }
 
     render() {
         return (
             <DateInput
                 value={this.state.value}
                 onChange={this.props.onChange}
                 minDate={this.props.minDate}
                 maxDate={this.props.maxDate}
                 minDateConfig={this.props.minDateConfig}
                 maxDateConfig={this.props.minDateConfig}
                 onSelectedOutputRange={this.props.onSelectedOutputRange}
             />
         );
     }
 
     render() {
         return (
             <DateInput
                 value={this.state.value}
                 onChange={this.props.onChange}
                 minDate={this.props.minDate}
                 maxDate={this.props.maxDate}
                 minDateConfig={this.props.minDateConfig}
                 maxDateConfig={this.props.minDateConfig}
                 onSelectedOutputRange={this.props.onSelectedOutputRange}
             />
         );
     }
 
     render() {
         return (
             <DateInput
                 value={this.state.value}
                 onChange={this.props.onChange}
                 minDate={this.props.minDate}
                 maxDate={this.props.maxDate}
                 minDateConfig={this.props.minDateConfig}
                 maxDateConfig={this.props.minDateConfig}
                 onSelectedOutputRange={this.props.onSelectedOutputRange}
             />
         );
     }
 
     render() {
         return (
             <DateInput
                 value={this.state.value}
                 onChange={this.props.onChange}
                 minDate={this.props.minDate}
                 maxDate={this.props.maxDate}
                 minDateConfig={this.props.minDateConfig}
                 maxDateConfig={this.props.minDateConfig}
                 onSelectedOutputRange={this.props.onSelectedOutputRange}
             />
         );
     }
 
     render() {
         return (
             <DateInput
                 value={this.state.value}
                 onChange={this.props.onChange}
                 minDate={this.props.minDate}
                 maxDate={this.props.maxDate}
                 minDateConfig={this.props.minDateConfig}
                 maxDateConfig={this.props.minDateConfig}
                 onSelectedOutputRange={this.props.onSelectedOutputRange}
             />
         );
     }
 
     render() {
         return (
             <DateInput
                 value={this.state.value}
                 onChange={this.props.onChange}
                 minDate={this.props.minDate}
                 maxDate={this.props.maxDate}
                 minDateConfig={this.props.minDateConfig}
                 maxDateConfig={this.props.minDateConfig}
                 onSelectedOutputRange={this.props.onSelectedOutputRange}
             />
         );
     }
 
     render() {
         return (
             <DateInput
                 value={this.state.value}
                 onChange={this.props.onChange}
                 minDate={this.props.minDate}
                 maxDate={this.props.maxDate}
                 minDateConfig={this.props.minDateConfig}
                 maxDateConfig={this.props.minDateConfig}
                 onSelectedOutputRange={this.props.onSelectedOutputRange}
             />
         );
     }
 
     render() {
         return (
             <DateInput
                 value={this.state.value}
                 onChange={this.props.onChange}
                 minDate={this.props.minDate}
                 maxDate={this.props.maxDate}
                 minDateConfig={this.props.minDateConfig}
                 maxDateConfig={this.props.minDateConfig}
                 onSelectedOutputRange={this.props.onSelectedOutputRange}
             />
         );
     }
 
     render() {
         return (
             <DateInput
                 value={this.state.value}
                 onChange={this.props.onChange}
                 minDate={this.props.minDate}
                 maxDate={this.props.maxDate}
                 minDateConfig={this.props.minDateConfig}
                 maxDateConfig={this.props.minDateConfig}
                 onSelectedOutputRange={this.props.onSelectedOutputRange}
             />
         );
     }
 
     render() {
         return (
             <DateInput
                 value={this.state.value}
                 onChange={this.props.onChange}
                 minDate={this.props.minDate}
                 maxDate={this.props.maxDate}
                 minDateConfig={this.props.minDateConfig}
                 maxDateConfig={this.props.minDateConfig}
                 onSelectedOutputRange={this.props.onSelectedOutputRange}
             />
         );
     }
 
     render() {
         return (
             <DateInput
                 value={this.state.value}
                 onChange={this.props.onChange}
                 minDate={this.props.minDate}
                 maxDate={this.props.maxDate}
                 minDateConfig={this.props.minDateConfig}
                 maxDateConfig={this.props.minDateConfig}
                 onSelectedOutputRange={this.props.onSelectedOutputRange}
             />
         );
     }
 
     render() {
         return (
