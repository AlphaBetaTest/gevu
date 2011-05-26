// ActionScript file
import flash.events.ErrorEvent;

import mx.collections.ArrayCollection;
import mx.controls.Alert;
import mx.events.ListEvent;
import mx.events.TreeEvent;
import mx.rpc.events.FaultEvent;
import mx.rpc.events.ResultEvent;


private var TreeObject:XML;
private var xmlTree:XML

private function init():void {
	xmlTree = 
	<node idLieu="-1" lib="root" fake="0">
		<node idLieu="1" lib="univers" fake="0">
			<node idLieu="-10"  fake="1" />
		</node>
	</node>;
	treeTree.dataProvider=xmlTree;
	roDiagnostique.getXmlNode(1);
	treeTree.showRoot=false;
}	

private function onStartup() : void {
}

private function treeItemOpened( event:TreeEvent ) : void {
	logThis("tree item has been developped");
	if (event.item.node.attribute("fake")==1)
	{
		logThis("has fake child, must be reloaded");
		var i:int = event.item.attribute("idLieu");
		roDiagnostique.getXmlNode(i);
	}
}

private function treeItemClicked( event:ListEvent ) : void {
	var tt:int;
	tt = event.currentTarget.selectedItem.attribute("idLieu");
	logThis( "tree item has been clicked. item is:"+
			 event.currentTarget.selectedItem.attribute("lib") );
	
	if(tt>0) roDiagnostique.getFields(tt);
}

private function testButtonClicked() : void {
	logThis("button clicked");
} 

private function logThis( txt : String ) : void {
	debugTest.text+=txt+"\n";
	debugTest.verticalScrollPosition = debugTest.maxVerticalScrollPosition;
}

private function displayNodeProperties( event:ResultEvent ) : void {
	var obj:Object;
	var arr:Array = new Array();
	var arrc:ArrayCollection = new ArrayCollection();
	
	var tmpArr:Array;
	var tmpStr:String;
	tmpArr = event.result.type;
	
	if(!tmpArr){
		tmpStr="-";
	}else{
		tmpStr=tmpArr[0];
		for (var i:int=1; i<tmpArr.length; ++i){
			tmpStr+=", "+tmpArr[i];
		}
	}
	
	obj={prop:"lib",		val:event.result.lib};			arr.push(obj);
	obj={prop:"id_lieu",	val:event.result.id_lieu};		arr.push(obj);
	obj={prop:"id_parent",	val:event.result.lieu_parent};	arr.push(obj);
	obj={prop:"niv",		val:event.result.niv};			arr.push(obj);
	obj={prop:"type",		val:tmpStr};					arr.push(obj);
	
	arrc.source=arr;
	dg.dataProvider=arrc
}

private function updateTreeStructure( event:ResultEvent ) : void {
	/* get the id of the node */
	var x:XML = <root></root>;
	x.appendChild(event.result);
	var idnoeud:int;
	idnoeud = x.node.attribute("idLieu");
	
	/* add the new real node */
	treeTree.dataProvider[0].descendants().(@idLieu == idnoeud)[0].appendChild(x.node.node);
	
	/* delete the old fake one */
	delete  treeTree.dataProvider[0].descendants().(@idLieu==idnoeud)[0].children()[0];
}

public function faultHandlerService(fault:FaultEvent, os:String=""):void {
	var str:String;
	
	trace(fault.fault.faultCode.toString());
	trace(fault.fault.faultDetail.toString());
	trace(fault.fault.faultString.toString());
	trace(fault.fault.rootCause.toString());
	
	str = "Code: "+fault.fault.faultCode.toString()+"\n"+
	      "Detail: "+fault.fault.faultDetail.toString()+"\n"+
	      "String: "+fault.fault.faultString.toString()+"\n";
	
	if (os!="")
		os = " - "+os;
	Alert.show(str, "FaultHandlerService"+os);
}

public function ErrorHandlerService(fault:ErrorEvent, os:String=""):void {
	var str:String;
	/*
	trace(fault.fault.faultCode.toString());
	trace(fault.fault.faultDetail.toString());
	trace(fault.fault.faultString.toString());
	trace(fault.fault.rootCause.toString());
	
	str = "Code: "+fault.fault.faultCode.toString()+"\n"+
	      "Detail: "+fault.fault.faultDetail.toString()+"\n"+
	      "String: "+fault.fault.faultString.toString()+"\n";*/
	
	if (os!="")
		os = " - "+os;
	Alert.show(str, "ErrorHandlerService"+os);
}
