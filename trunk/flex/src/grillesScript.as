import compo.*;

import mx.collections.ArrayCollection;
import mx.controls.Alert;
import mx.controls.dataGridClasses.DataGridColumn;
import mx.controls.listClasses.IDropInListItemRenderer;
import mx.events.CloseEvent;
import mx.events.DataGridEvent;
import mx.managers.CursorManager;
import mx.rpc.AsyncToken;
import mx.rpc.events.FaultEvent;
import mx.rpc.events.ResultEvent;
import mx.rpc.http.HTTPService;
import mx.managers.PopUpManager;

//include the constant definition of the server endpoint URL
include "grillesconfig.as";


[Bindable]
public var dataArr:ArrayCollection = new ArrayCollection();
[Bindable]
public var exi:Object;
private var idExi:String = "";

 
public function init():void
{
	//construction de la fenêtre d'édition
	var twLog:twLogin= twLogin(
        PopUpManager.createPopUp(this, twLogin, true));
	twLog.endPoint=ENDPOINT_SERVICE;
    PopUpManager.centerPopUp(twLog);
        	
} 
 