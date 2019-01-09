(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1:function(e,t,a){},15:function(e,t,a){e.exports=a(23)},23:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(13),o=a.n(s),l=(a(1),a(2)),c=a(3),i=a(5),m=a(4),u=a(6),p=a(11),h=a(14),d=a(10);var f=function(e){return r.a.createElement("div",{className:"".concat(e.divClass)},r.a.createElement("span",{className:"Box--id"},e.id))};var b=function(e){return r.a.createElement("footer",{className:"footer"},!e.demoStarted&&r.a.createElement("div",{className:"btn-container"},r.a.createElement("button",{className:"btn-start",onClick:e.startDemo},"start")),e.demoStarted&&r.a.createElement("div",{className:"btn-container"},e.currentStep>1&&r.a.createElement("button",{className:"btn-back",onClick:function(){return e.goToStep(-1)}},"back"),r.a.createElement("button",{className:"btn-restart",onClick:e.restartDemo},"restart"),e.currentStep!==e.lastStep&&r.a.createElement("button",{className:"btn-next",onClick:function(){return e.goToStep(1)}},"next")))},g=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(s)))).getExplanation=function(){var e=a.props.step,t=e.boxIds,n=e.i,s=e.j,o=e.temp;switch(e.animation){case"compare":return r.a.createElement("p",null,"compare ",r.a.createElement("span",null,t[n])," and ",r.a.createElement("span",null,t[s]));case"compare-adjacent":return r.a.createElement("p",null,"compare ",r.a.createElement("span",null,t[s])," and ",r.a.createElement("span",null,t[n]));case"swap":return r.a.createElement("p",null,r.a.createElement("span",null,t[n])," swaps with ",r.a.createElement("span",null,t[s]));case"unsorted":return r.a.createElement("p",null,r.a.createElement("span",null,t[n])," and ",r.a.createElement("span",null,t[s])," are out of order");case"sorted":return r.a.createElement("p",null,r.a.createElement("span",null,t[n])," and ",r.a.createElement("span",null,t[s])," are in the correct order");case"stop-first-comparison":case"stop-mult-comparisons":return r.a.createElement("p",null,r.a.createElement("span",null,t[s])," and ",r.a.createElement("span",null,o)," are in the correct order");case"examine":return r.a.createElement("p",null,"compare ",r.a.createElement("span",null,t[n])," with the elements to its left");case"nothing-on-left":case"less-than-all":return r.a.createElement("p",null,"there are no numbers to compare with ",r.a.createElement("span",null,o));case"compare-again":return r.a.createElement("p",null,"compare ",r.a.createElement("span",null,t[s])," and ",r.a.createElement("span",null,o));case"greater-first-comparison":case"greater-mult-comparisons":return r.a.createElement("p",null,r.a.createElement("span",null,t[s])," is greater than ",r.a.createElement("span",null,o));case"shift":return r.a.createElement("p",null,r.a.createElement("span",null,t[s])," shifts to the right");case"insert":return r.a.createElement("p",null,r.a.createElement("span",null,o)," gets inserted");case"end":return r.a.createElement("p",null,"the array is sorted");default:return r.a.createElement("p",null)}},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.getExplanation();return r.a.createElement("div",{className:"explanation"},e)}}]),t}(n.Component),E=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).componentDidMount=function(){var e=[1,2,3,4,5,6,7,8];a.fisherYatesShuffle(e),a.setState({boxIds:e})},a.fisherYatesShuffle=function(e){for(var t=0;t<e.length-1;t++){var a=Math.floor(Math.random()*(e.length-t))+t,n=[e[a],e[t]];e[t]=n[0],e[a]=n[1]}},a.removeDuplicateIds=function(e,t){for(var a=Object(d.a)(e).slice(0),n=0;n<a.length-1;n++)a[n]===a[n+1]&&"shift"!==t?a[n]=null:a[n]===a[n+1]&&"shift"===t&&(a[n+1]=null);return a},a.getTempBox=function(e){var t=e.temp,a=e.boxIds,n=e.i,s=e.j,o=e.animation;return a.map(function(e,a){var l="Box Box-temp";return"insert"===o?l+=" insert".concat(n-(s+1)):"compare-again"===o?l+=" examine":"less-than-all"!==o&&"stop-mult-comparisons"!==o||(l+=" sorted"),a===n?r.a.createElement(f,{id:t,divClass:l,key:t}):r.a.createElement("div",{key:e})})},a.getInitialBoxes=function(){return a.state.boxIds.map(function(e){return r.a.createElement(f,{id:e,divClass:"Box",key:e})})},a.getDescription=function(e){return"Bubble Sort"===e?"Bubble sort works by repeatedly swapping adjacent elements if they are in the wrong order.":"Insertion Sort"===e?"Insertion sort works by sorting the left side of an array one element at a time.":void 0},a.getDemoBoxes=function(e){var t=e.i,n=e.j,s=e.iteration,o=e.boxIds,l=e.animation,c=a.getClassNames(l),i=Object(h.a)(c,2),m=i[0],u=i[1];return o.map(function(e,a){var c="Box ";return a>=o.length-s||"end"===l?c+="Box-final-position":null===e?c="Box-empty":a===t?c+=m:a===n&&(c+=u),r.a.createElement(f,{id:e,divClass:c,key:e})})},a.getClassNames=function(e){switch(e){case"swap":return["right-swap","left-swap"];case"unsorted":return["unsorted","unsorted"];case"sorted":case"stop-first-comparison":return["sorted","sorted"];case"stop-mult-comparisons":return["","sorted"];case"examine":return["examine",""];case"nothing-on-left":return["sorted",""];case"compare":case"compare-adjacent":return["examine","examine"];case"compare-again":return["","examine"];case"greater-first-comparison":return["move-up unsorted","unsorted"];case"greater-mult-comparisons":return["","unsorted"];case"shift":return["","shift-right"];default:return["",""]}},a.getBubbleSortSteps=function(){var e,t,n,r=Object(d.a)(a.state.boxIds).slice(0),s=[],o=function(a){s.push({boxIds:Object(p.a)(r),animation:a,iteration:e,i:t,j:n})};for(o(""),e=0;e<r.length;e++)for(t=0;t<r.length-e-1;t++)if(n=t+1,o("compare"),r[t]>r[n]){o("unsorted"),o("swap");var l=[r[n],r[t]];r[t]=l[0],r[n]=l[1]}else o("sorted");return o("end"),s},a.getInsertionSortSteps=function(){var e,t,n,r=Object(d.a)(a.state.boxIds).slice(0),s=[],o=function(o){s.push({boxIds:a.removeDuplicateIds(Object(p.a)(r),o),animation:o,temp:e,i:t,j:n})};for(o(""),t=0;t<r.length;t++){for(e=r[t],n=t-1,o("examine"),-1===n?o("nothing-on-left"):(o("compare-adjacent"),n>=0&&r[n]<e&&o("stop-first-comparison"));n>=0&&r[n]>e;)o(t-n===1?"greater-first-comparison":"greater-mult-comparisons"),r[n+1]=r[n],o("shift"),-1===--n?o("less-than-all"):(o("compare-again"),n>=0&&r[n]<e&&o("stop-mult-comparisons"));r[n+1]!==e&&o("insert"),r[n+1]=e}return o("end"),s},a.startDemo=function(){var e;"Bubble Sort"===a.props.algorithmName?e=a.getBubbleSortSteps():"Insertion Sort"===a.props.algorithmName&&(e=a.getInsertionSortSteps()),a.setState({allSteps:e,currentStep:1})},a.goToStep=function(e){var t=a.state,n=t.currentStep,r=t.allSteps,s=n+e;0<s&&s<r.length&&a.setState({currentStep:s})},a.restartDemo=function(){a.setState({allSteps:[],currentStep:null})},a.state={boxIds:[],allSteps:[],currentStep:null},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.state,t=e.allSteps,a=e.currentStep,n=this.state.allSteps.length>0,s=(n?t[a]:this.state).boxIds;return r.a.createElement("section",{className:"Demo fade-in"},r.a.createElement("h2",{className:"Demo--h2"},this.props.algorithmName),r.a.createElement("div",{className:"explanation"},!n&&r.a.createElement("p",{className:"p--description"},this.getDescription(this.props.algorithmName)),n&&r.a.createElement(g,{step:t[a]})),r.a.createElement("div",{className:"algorithm"},s.includes(null)&&this.getTempBox(t[a]),n&&this.getDemoBoxes(t[a]),!n&&this.getInitialBoxes()),r.a.createElement(b,{demoStarted:n,currentStep:this.state.currentStep,lastStep:this.state.allSteps.length-1,startDemo:this.startDemo,goToStep:this.goToStep,restartDemo:this.restartDemo}))}}]),t}(n.Component),S=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(i.a)(this,Object(m.a)(t).call(this))).goToBubbleSort=function(){e.setState({showBubbleSort:!0})},e.goToInsertionSort=function(){e.setState({showBubbleSort:!1})},e.state={showBubbleSort:!0},e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("h1",{className:"App--h1 fade-in"},"study sorting"),this.state.showBubbleSort&&r.a.createElement("main",{className:"main"},r.a.createElement(E,{algorithmName:"Bubble Sort"}),r.a.createElement("div",{className:"main--right-arrow",onClick:this.goToInsertionSort})),!this.state.showBubbleSort&&r.a.createElement("main",{className:"main"},r.a.createElement("div",{className:"main--left-arrow",onClick:this.goToBubbleSort}),r.a.createElement(E,{algorithmName:"Insertion Sort"})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[15,2,1]]]);
//# sourceMappingURL=main.866f103b.chunk.js.map