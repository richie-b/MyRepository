Ext.ns('RTTS');

RTTS.DailyDetailPanel = function() {
	RTTS.DailyDetailPanel.superclass.constructor.apply(this, arguments);
};

Ext.extend(RTTS.DailyDetailPanel, RTTS.GenericForm);

RTTS.DailyDetailPanel.prototype.initComponent = function() {
	this.projectCombo = this.getUserProjectCombo(true);
	// this.projectCombo = null;
	this.tagCombo = this.getUserTagCombo();

	this.saveDraftBut = new Ext.Button({
		text : 'Save Draft',
		iconCls : 'btn-save',
		handler : function(btn) {
			this.submit(false);
		},
		scope : this
	});
	this.submitBut = new Ext.Button({
		text : 'Submit',
		iconCls : 'btn-submit',
		handler : function(btn) {
			this.submit(true);
		},
		scope : this
	});
	this.dateField = new Ext.ux.form.XDateField({
		// xtype: 'xdatefield',
		fieldLabel : 'Date',
		name : 'date',
		anchor : '100%',
		allowBlank : false,
		required : true,
		submitFormat : 'timestamp',
		forceSelection : true
	});
	this.startTime = new Ext.ux.form.XTimeField({
		// xtype:'xtimefield',
		fieldLabel : 'Start Time',
		name : 'startTime',
		allowBlank : false,
		required : true,
		submitFormat : 'Hi',
		increment : 15,
		forceSelection : true
	});
	this.endTime = new Ext.ux.form.XTimeField({
		// xtype:'xtimefield',
		fieldLabel : 'End Time',
		name : 'endTime',
		allowBlank : false,
		required : true,
		submitFormat : 'Hi',
		increment : 15
	});
	this.ccList = {
			xtype : 'textfield',
			fieldLabel : 'CC List',
			name : 'ccList',
			// vtype: 'email',
			maxLength : '255',
			blankText : 'A semicolon separated list of emails...',
			allowBlank : true,
			required : false,
			anchor : '100%',
	},

	this.bodyField = new Ext.ux.TinyMCE(
			{
				// allowBlank: true,
				// name: "emailbody",
				// fieldLabel: "Body",
				// height: 300,
				// qtip: "The email body",
				autoScroll: true,
				fieldLabel : "Tasks Performed For The Day",
				name : 'body',
				height : 150,
				tinymceSettings : {
					// General options
					mode : "textareas",
					theme : "advanced",

					plugins : "table,inlinepopups, iespell",

					// Theme options
					theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,formatselect,|,table,removeformat,|,bullist,numlist,|,undo,redo,|,forecolor,backcolor,code",
					theme_advanced_buttons2 : "",
					theme_advanced_buttons3 : "",
					theme_advanced_buttons4 : "",
					theme_advanced_toolbar_location : "top",
					theme_advanced_toolbar_align : "left",
					theme_advanced_statusbar_location : "",
					theme_advanced_resizing : true
				}
			});
	
	var accordion = {
		    id: 'accordion-panel',
		    title: 'Accordion Layout',
		    layout: 'accordion',
		    bodyBorder: false,  // useful for accordion containers since the inner panels have borders already
		    bodyStyle: 'background-color:#DFE8F6',  // if all accordion panels are collapsed, this looks better in this layout
		    defaults: {bodyStyle: 'padding:15px'},
		    items: [{
		    	title: 'Introduction',
		        tools: [{id:'gear'},{id:'refresh'}],
		        html: '<p>Here is some accordion content.  Click on one of the other bars below for more.</p>'
		    }]
		    };
	
	/*this.toDoField = new Ext.ux.TinyMCE(
			{
				// allowBlank: true,
				// name: "emailbody",
				// fieldLabel: "Body",
				// height: 300,
				// qtip: "The email body",
				fieldLabel : "Tasks To Be Completed",
				name : 'to_do',
				height : 150,
				tinymceSettings : {
					// General options
					mode : "textareas",
					theme : "advanced",

					plugins : "table,inlinepopups, iespell",

					// Theme options
					theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,formatselect,|,table,removeformat,|,bullist,numlist,|,undo,redo,|,forecolor,backcolor,code",
					theme_advanced_buttons2 : "",
					theme_advanced_buttons3 : "",
					theme_advanced_buttons4 : "",
					theme_advanced_toolbar_location : "top",
					theme_advanced_toolbar_align : "left",
					theme_advanced_statusbar_location : "",
					theme_advanced_resizing : true
				}
			});
	
	this.issuesField = new Ext.ux.TinyMCE(
			{
				// allowBlank: true,
				// name: "emailbody",
				// fieldLabel: "Body",
				// height: 300,
				// qtip: "The email body",
				fieldLabel : "Issues",
				name : 'issues',
				height : 150,
				tinymceSettings : {
					// General options
					mode : "textareas",
					theme : "advanced",

					plugins : "table,inlinepopups, iespell",

					// Theme options
					theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,formatselect,|,table,removeformat,|,bullist,numlist,|,undo,redo,|,forecolor,backcolor,code",
					theme_advanced_buttons2 : "",
					theme_advanced_buttons3 : "",
					theme_advanced_buttons4 : "",
					theme_advanced_toolbar_location : "top",
					theme_advanced_toolbar_align : "left",
					theme_advanced_statusbar_location : "",
					theme_advanced_resizing : true
				}
			});

	this.observationsField = new Ext.ux.TinyMCE(
			{
				// allowBlank: true,
				// name: "emailbody",
				// fieldLabel: "Body",
				// height: 300,
				// qtip: "The email body",
				fieldLabel : "Intersting Observations",
				name : 'observations',
				height : 150,
				tinymceSettings : {
					// General options
					mode : "textareas",
					theme : "advanced",

					plugins : "table,inlinepopups, iespell",

					// Theme options
					theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,formatselect,|,table,removeformat,|,bullist,numlist,|,undo,redo,|,forecolor,backcolor,code",
					theme_advanced_buttons2 : "",
					theme_advanced_buttons3 : "",
					theme_advanced_buttons4 : "",
					theme_advanced_toolbar_location : "top",
					theme_advanced_toolbar_align : "left",
					theme_advanced_statusbar_location : "",
					theme_advanced_resizing : true
				}
			});
	
	this.likesDislikesField = new Ext.ux.TinyMCE(
			{
				// allowBlank: true,
				// name: "emailbody",
				// fieldLabel: "Body",
				// height: 300,
				// qtip: "The email body",
				fieldLabel : "Likes/Dislikes",
				name : 'likes_dislikes',
				height : 150,
				tinymceSettings : {
					// General options
					mode : "textareas",
					theme : "advanced",

					plugins : "table,inlinepopups, iespell",

					// Theme options
					theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,formatselect,|,table,removeformat,|,bullist,numlist,|,undo,redo,|,forecolor,backcolor,code",
					theme_advanced_buttons2 : "",
					theme_advanced_buttons3 : "",
					theme_advanced_buttons4 : "",
					theme_advanced_toolbar_location : "top",
					theme_advanced_toolbar_align : "left",
					theme_advanced_statusbar_location : "",
					theme_advanced_resizing : true
				}
			});
	
	this.suggestionsField = new Ext.ux.TinyMCE(
			{
				// allowBlank: true,
				// name: "emailbody",
				// fieldLabel: "Body",
				// height: 300,
				// qtip: "The email body",
				fieldLabel : "Suggestions",
				name : 'suggestions',
				height : 150,
				tinymceSettings : {
					// General options
					mode : "textareas",
					theme : "advanced",

					plugins : "table,inlinepopups, iespell",

					// Theme options
					theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,formatselect,|,table,removeformat,|,bullist,numlist,|,undo,redo,|,forecolor,backcolor,code",
					theme_advanced_buttons2 : "",
					theme_advanced_buttons3 : "",
					theme_advanced_buttons4 : "",
					theme_advanced_toolbar_location : "top",
					theme_advanced_toolbar_align : "left",
					theme_advanced_statusbar_location : "",
					theme_advanced_resizing : true
				}
			});*/
	
	var config = {
			title : 'Daily', // we will append date later, after it is loaded
			// from controller
			iconCls : 'tab-daily',
			labelWidth : 75,
			baseCls : 'x-plain',
			bodyStyle : 'padding: 10px 20px 0px 10px;',
			width : 350,
			autoScroll: true,
			//height: 500,
			defaults : {
				validationEvent : false,
				enableKeyEvents : true
			},
			tbar : [ this.saveDraftBut, this.submitBut ],
			items : [ this.dateField, this.projectCombo, this.ccList,
			          this.startTime, this.endTime, this.tagCombo, this.bodyField, accordian/*, this.toDoField, this.issuesField, this.observationsField, this.likesDislikesField, this.suggestionsField*/],
			          plugins : [ new RTTS.Tracking() ],
	};

	Ext.apply(this.initialConfig, {
		trackResetOnLoad : true
	});

	Ext.apply(this, config);
	RTTS.DailyDetailPanel.superclass.initComponent.apply(this, arguments);
};

RTTS.DailyDetailPanel.prototype.load = function() {
	var promise = when.defer();
	this.getForm().load(
			{
				url : RTTS.frontUrl,
				params : {
					c : 'DailyController',
					a : 'getDaily',
					dailyId : this.dailyId
				},
				success : function(form, action) {
					promise.resolve(true);
					if (!action.result.data.isDraft) {
						// replace combo or replace combo store (refresh)
						var myStore = this.projectCombo.getStore();
						myStore.setBaseParam('c', 'DailyController');
						myStore.setBaseParam('a', 'getProjectListForDaily');
						myStore.setBaseParam('dailyId', this.dailyId);
						myStore.on('load', this.resetCombo, this);
						myStore.load();

						this.disable();
						this.disableTinyMCE();
					}

					/*
					 * Retrieve date value and append it to tab title.
					 * 
					 * NOTE: This solves issue observed in TEAM-192, without
					 * violating requirement of TEAM-135.
					 */

					this.setTitle('Daily | '
							+ this.dateField.getValue().format('m/d/Y'));

				},
				failure : function(form, action) {
					promise.resolve(false);
					RTTS.Notification.showMsg("Failed to load Daily!");
					this.destroy();
				},
				scope : this
			});

	return promise;
};

RTTS.DailyDetailPanel.prototype.getUserProjectCombo = function(isDraft) {

	var baseParamameters = {};

	if (isDraft) {
		baseParamameters = {
				c : 'ProjectController',
				a : 'getActiveProjectListForUser',
				userId : RTTS.Application.getUser().userId
		};
	} else {
		baseParamameters = {
				c : 'DailyController',
				a : 'getProjectListForDaily',
				dailyId : this.dailyId
		};
	}

	var combo = new Ext.form.ComboBox({
		fieldLabel : 'Project',
		mode : 'local',
		emptyText : 'Select Project...',
		hiddenName : 'projectId',
		valueField : 'projectId',
		editable : false,
		store : new Ext.data.JsonStore({
			url : RTTS.frontUrl,
			autoDestroy : true,
			autoLoad : true,
			baseParams : baseParamameters,
			root : 'data.records',
			idProperty : 'projectId',
			fields : [ {
				name : 'projectId',
				type : 'string'
			}, {
				name : 'projectName',
				type : 'string'
			} ]
		}),
		displayField : 'projectName',
		triggerAction : 'all',
		forceSelection : true,
		allowBlank : false,
		required : true

	});
	return combo;
};

RTTS.DailyDetailPanel.prototype.getUserTagCombo = function() {

	var dailyTagCombo = new Ext.ux.form.SuperBoxSelect({ //Ext.form.ComboBox
		xtype: 'superboxselect',
		name: 'tags',
		id: 'tagsSuperBox',
		fieldLabel : 'Tags',
		emptyText : 'Select Daily Tags...',
		forceSelection: true,
		mode: 'local',
		store : new Ext.data.JsonStore({
			autoDestroy : true,
			autoLoad : true,
			baseParams : {
				c : 'DailyController',
				a : 'getTagList'
			},
			root : 'data.records',
			idProperty : 'tagId',
			fields : [ {
				name : 'tagId',
				type : 'string'
			},{
				name : 'tagName',
				type : 'string'
			}],
			sortInfo: {
				field: 'tagName',
				direction: 'ASC'
			}
		}),
		displayField : 'tagName',
		valueField: 'tagId',
		triggerAction: 'all',
		typeAhead: false,
		width: 500,
		//renderTo: ,
		listeners: {
			render: function (c) {
				new Ext.ToolTip({
					target: c.getEl,
				    title: 'Tags Tool Tip',
				    width: 200,
				    html: 'To select a Tag use the mouse or press the Tab key. To create a new Tag, type the tag into the box and press the Enter key',
				    trackMouse:true					
				});
			},
			specialkey: function(field, e){
				// e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
				// e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
				
				//Checks if tab key is pressed, sets to empty string
				if (e.getKey() == e.TAB) {
					field.lastQuery = "";
				}
				
				//Checks if user input is empty, sets to empty string
				else if (e.getKey() == e.ENTER && field.lastQuery == "" && this.tagCombo.getValue() != "") {
					field.lastQuery = "";
				}
				
				//Checks if user input is duplicate value in the store
				else if (e.getKey() == e.ENTER && field.lastQuery != "" && field.lastQuery != null) {

					var tagsString = "";
					var count = 0;

					if(field.items.length > 0) {
						count = field.items.length;
						for(var i = 0; i < count; i++) {
							tagsString = tagsString + "," + field.items.items[i].caption;
						}
					}
					
					//Creates new tag if user input is not a duplicate entry or empty string
					if(tagsString.indexOf(field.lastQuery) == -1) {

						var msg = 'Are you sure you want to create the tag(s):' + '\n' + field.lastQuery;

						Ext.Msg.show({
							title : 'Add Tag',
							maxWidth : 400,
							icon : Ext.Msg.QUESTION,
							proxyDrag : true,
							msg : msg,
							buttons : Ext.Msg.OKCANCEL,
							fn : function(bId, text, opt) {
								if (bId == 'ok') {
									RTTS.Ajax.request({
										params : {
											c : 'DailyController',
											a : 'createNewTag',
											tagName : field.lastQuery
										},
										onSuccess : function(jsonResponse) {
											this.tagCombo.store.reload();
											var newTagId = jsonResponse.data.id;
											var currentTagIds = this.tagCombo.getValue();
											currentTagIds = currentTagIds + "," + newTagId.toString();
											this.tagCombo.store.on('load', function(){
											this.tagCombo.setValue(currentTagIds);
											}, 
											this,{ 
												single:true
											});
										},
										onFailure : function(jsonResponse) {
											if (jsonResponse.errorMessage)
												Ext.MessageBox.alert("Error", jsonResponse.errorMessage);
											else
												Ext.MessageBox.alert("Error", "Error creating new tag");
										},
										scope : this
									}); scope:this;
								}
							},
							scope : this
						});
					}
				}
			}, scope: this
		}
	});
	return dailyTagCombo;
};

var tagToolTip = new Ext.ToolTip({
    target: this.tagCombo,//'tagsSuperBox',
    title: 'Tags Tool Tip',
    width: 200,
    html: 'To select a Tag use the mouse or press the Tab key. To create a new Tag, type the tag into the box and press the Enter key',
    trackMouse:true
});

RTTS.DailyDetailPanel.prototype.submit = function(publish) {
	var promise = when.defer();

	var form = this.getForm();
	if (form.isValid()) {

		form.submit({
			url : RTTS.frontUrl,
			params : {
				c : 'DailyController',
				a : 'modifyDaily',
				dailyId : this.dailyId,
				tags: form.getFieldValues().tags
			},
			success : function(form, action) {
				promise.resolve(true);
				RTTS.MsgBus.fireEvent('modifiedDaily');
				RTTS.Notification.showMsg("Daily saved");
				if (publish) {
					this.publish();
				}
			},
			failure : function(form, action) {
				promise.resolve(false);
				switch (action.failureType) {

				case Ext.form.Action.CLIENT_INVALID:
					this.setErrorMessage('Invalid Field(s)');
					break;

				case Ext.form.Action.CONNECT_FAILURE:
					this.setErrorMessage('An error has occurred');
					break;

				case Ext.form.Action.SERVER_INVALID:
					this.setErrorMessage(action.result.errorMessage
							.toLowerCase());
					break;

				}
			},
			scope : this
		});
	} else {
		promise.resolve(false);
	}

	return promise;
};

RTTS.DailyDetailPanel.prototype.publish = function() {
	RTTS.Ajax.request({
		params : {
			c : 'DailyController',
			a : 'publishDaily',
			dailyId : this.dailyId
		},
		onSuccess : function(jsonResponse) {
			RTTS.MsgBus.fireEvent('publishedDaily', this.dailyId);
			RTTS.Notification.showMsg("Daily has been published!");
			this.disable();
			this.disableTinyMCE();
			this.destroy();
			RTTS.Application.loadView("RTTS.AppView", {
				p : 'RTTS.MyDailyGrid'
			});
		},
		onFailure : function(jsonResponse) {
			if (jsonResponse.errorMessage)
				Ext.MessageBox.alert("Error", jsonResponse.errorMessage);
			else
				Ext.MessageBox.alert("Error", "Error publishing daily");
		},
		scope : this
	});
};

RTTS.DailyDetailPanel.prototype.disableTinyMCE = function() {
	tinymce.get(this.bodyField.id).getBody().setAttribute('contenteditable',
			false);
	for ( var x in tinymce.activeEditor.controlManager.controls) {
		tinymce.get(this.bodyField.id).controlManager.get(x).setDisabled(true);
	}
};

RTTS.DailyDetailPanel.prototype.getState = function() {
	return {
		dailyId : this.dailyId,
		isDraft : this.isDraft
	};
};

RTTS.DailyDetailPanel.prototype.setState = function(state) {
};

RTTS.DailyDetailPanel.getId = function(config) {
	return 'RTTS.DailyDetailPanel#' + config.dailyId;
};

RTTS.DailyDetailPanel.prototype.resetCombo = function(myStore, records,
		options) {
	this.projectCombo.reset();
};

Ext.reg('RTTS.DailyDetailPanel', RTTS.DailyDetailPanel);
