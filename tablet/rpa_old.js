/*
 repair by : harris muhammad Zaki
 request by Mr. Yudi from Mr. Muramatsu :
 if room is not exists dont reset form input
 solution :
 delete text after 372 and before 373 
 --------------------------------------
	Ext.getCmp('xt_starttime').reset();
	Ext.getCmp('xt_endtime').reset();  
	Ext.getCmp('xt_endtime').disable();
 --------------------------------------
*/

Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '../extjs-4.2.2/examples/ux/');
Ext.require(['Ext.data.*', 'Ext.grid.*']);
Ext.onReady(function(){
    Ext.QuickTips.init();
    //==========================VARIABLE===========================================================================
        var sm          = Ext.create('Ext.selection.CheckboxModel');
        var clock 	    = Ext.create('Ext.toolbar.TextItem', {text: Ext.Date.format(new Date(), 'g:i:s A')});
        var itemperpage = 25;
        var required    = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
    //==========================VARIABLE===========================================================================
    //==========================DS NO DB===========================================================================
    /*==========ds_rooms===========*/
    /*    Ext.define('M_rooms',{
            extend: 'Ext.data.Model',
            fields: ['id_rentroom','roomcode','start_date','end_date','dept','purpose','remark','totcount']
        });
       var db_rooms = [
            ['1','VIP1','Harris Muhammad Zaki','10-03-2016','ANN','2','16','Cuti Coy','4'],
            ['212007226','30001','Harris Muhammad Zaki','10-03-2016','ANN','2','16','Cuti Coy','4'],
            ['212007226','30001','Harris Muhammad Zaki','10-03-2016','ANN','2','16','Cuti Coy','4'],
            ['212007226','30001','Harris Muhammad Zaki','10-03-2016','ANN','2','16','Cuti Coy','4'],
            ['212007226','30001','Harris Muhammad Zaki','10-03-2016','ANN','2','16','Cuti Coy','4'],
            ['212007226','30001','Harris Muhammad Zaki','10-03-2016','ANN','2','16','Cuti Coy','4'],
            ['212007226','30001','Harris Muhammad Zaki','10-03-2016','ANN','2','16','Cuti Coy','4']
            
        ];
        
        var ds_rooms = Ext.create('Ext.data.ArrayStore',{
            model   : 'M_rooms',
            data : db_rooms
        }); 
        /*=========ds_rooms==========*/
    //==========================DS NO DB===========================================================================
    //==========================DS STORE===========================================================================
        /*=========ds_view_rpa==========*/
        Ext.define('M_view_rpa',{
            extend: 'Ext.data.Model',
            fields: ['id_rpa','date','start_time','end_time','dept','incharge','purpose','remark']
        });
    
        var ds_view_rpa = Ext.create('Ext.data.Store',{
            model	: 'M_view_rpa',
            autoLoad: true,
            proxy	: {
                type	: 'ajax',
                api     : {
                    read    : 'json/json_viewrpa.php',
                },
                reader	: {
                    type    : 'json',
                    root	: 'data'
                }
            }
        });
        /*=========ds_view_rpa==========*/
	//==========================DS STORE==============================================================================
    //==========================FUNCTION==============================================================================
        /*======================register_data===========================*/
        function register_data() {
            var win_register;
            if (!win_register) {
                var form_register = Ext.widget('form', {
                    layout : {
                        type  : 'vbox',
                        align : 'stretch'
                        },
                    border     : false,
                    autoScroll : false,
                    bodyPadding: 10,

                    fieldDefaults :{
                        labelWidth: 120,
                        labelStyle: 'font-weight:bold',
                        msgTarget : 'side'
                    },
                    defaults      : {
                        margins : '0 0 5 0'
                    },
					items         : [
						{
							xtype	: 'hiddenfield',
							name	: 'xt_type',
							value	: 'register',
						},
						{
                            xtype 				: 'datefield',
                            id					: 'xt_date',
                            name				: 'xt_date',
                            emptyText			: 'SELECT DATE',
                            fieldLabel			: 'DATE',
                            beforeLabelTextTpl	: required+' ',
                            labelSeparator		: '',
                            allowBlank      	: false,
                            format				: 'd F Y',
                            submitFormat		: 'Y-m-d',
                            mode				: 'local',  
                            editable			: false,
                            width				: 350,
							minValue			: new Date()
                        },
						{
							xtype	: 'container',
							flex	: 1,
							id		: 'cont-2',
							layout	: 'anchor',
							padding	: '5 0 5 0',
							items: [
								{
									xtype	: 'container',
									flex	: 1,
									id		: 'cont-3',
									layout	: 'hbox',
									padding	: '0 0 5 0',
									items: [
										{
											xtype				: 'timefield',
											id					: 'xt_starttime',
											name				: 'xt_starttime',
											emptyText			: 'START',
											fieldLabel			: 'TIME',
											beforeLabelTextTpl	: required+' ',
											labelSeparator		: '',
											minValue			: '08:10',
											maxValue			: '17:30',
											increment			: 15,
											format				: 'H:i',
											width				: 250,
											allowBlank			: false,
											listeners			:{
												select : function(){
													Ext.getCmp('xt_endtime').enable();
												},
												change : function(f, new_val){
													var valtime = Ext.getCmp('xt_starttime').getValue();
													if (valtime == null){
														Ext.getCmp('xt_endtime').reset();
														Ext.getCmp('xt_endtime').disable();
													}
													else{
														var sttimetemp = Ext.Date.format(Ext.getCmp('xt_starttime').getValue(), 'H:i');
														var jam		   = (parseInt(sttimetemp.substring(0, 2)));
														var menit	   = sttimetemp.substring(3, 5);
														if (jam >= 24){ jam = jam-24 }else{ jam = jam; }
														if (jam <= 9){ var sttime = '0'+jam+':'+menit; }else{ var sttime = jam+':'+menit; }
														Ext.getCmp('xt_endtime').setMinValue( sttime );
														Ext.getCmp('xt_endtime').reset();
													}
												}
											}
										},
										{xtype : 'label', html : '&nbsp;-&nbsp;'},
										{
											xtype				: 'timefield',
											id					: 'xt_endtime',
											name				: 'xt_endtime',
											emptyText			: 'END',
											allowBlank			: false,
											disabled			: true,
											increment			: 15,
											format				: 'H:i',
											minValue			: '08:10',
											maxValue			: '17:30',
											width				: 130,
											allowBlank			: false,
										}
									]
								}
							]
						},
						{
							xtype	: 'textfield',
							id		: 'xt_dept',
							name	: 'xt_dept',
							fieldLabel	: 'DEPARTMENT',
							emptyText: 'DEPARTMENT',
							allowBlank			: false,
							beforeLabelTextTpl:required+' ',
							labelSeparator: '',
							width: 350,
							listeners       	: {
                                change : function(f, new_val) {
                                    f.setValue(new_val.toUpperCase());
                                }
                            }
						},
						{
							xtype				: 'textfield',
							id					: 'xt_incharge',
							name				: 'xt_incharge',
							fieldLabel			: 'INCHARGE',
							emptyText 			: 'INCHARGE / USERNAME',
							beforeLabelTextTpl	:required+' ',
							labelSeparator		: '',
							width				: 350,
							allowBlank			: false,
							listeners       	: {
                                change : function(f, new_val) {
                                    f.setValue(new_val.toUpperCase());
                                }
                            }
						},
						{
							xtype	: 'textareafield',
							id		: 'xt_purpose',
							name	: 'xt_purpose',
							fieldLabel	: 'PURPOSE',
							emptyText	: 'PURPOSE',
							beforeLabelTextTpl:required+' ',
							labelSeparator: '',
							width: 350,
							allowBlank			: false,
							listeners       	: {
                                change : function(f, new_val) {
                                    f.setValue(new_val.toUpperCase());
                                }
                            }
						},
						{
							xtype	: 'textareafield',
							id		: 'xt_remark',
							name	: 'xt_remark',
							fieldLabel	: 'REMARK',
							emptyText	: 'REMARK',
							beforeLabelTextTpl:'&nbsp;&nbsp;&nbsp;',
							labelSeparator: '',
							width: 350,
							allowBlank			: true,
							listeners       	: {
                                change : function(f, new_val) {
                                    f.setValue(new_val.toUpperCase());
                                }
                            }
						}
					],
                    buttons : [
                        {
                            text    : 'Reset',
                            iconCls	: 'icon-reset-icon8',
                            handler : function() {
                                this.up('form').getForm().reset();
                            }
                        },
                        {
                            text    	: 'Save',
                            iconCls		: 'icon-save-icon8',
                            formBind	: true,
                            handler  	: function() {
								var form = this.up('form').getForm();
                                var popwindow = this.up('window');
                                if (form.isValid()) {
                                    form.submit({
                                        url             : 'resp/resp_rpa.php',
                                        waitMsg         : 'Sending your data...',
                                        submitEmptyText : false,

                                        success : function(form, action) {
                                            Ext.getCmp('xt_date').focus(false, 1000);
                                            ds_view_rpa.loadPage(1);
                                            popwindow.close();
                                           
                                            Ext.Msg.show({
                                                title   : 'Success',
                                                icon	: Ext.Msg.INFO,
                                                msg     : action.result.msg,
                                                buttons : Ext.Msg.OK
                                            });
                                        },

                                        failure : function(form, action) {
                                            Ext.Msg.show({
                                                title   : 'Failure',
                                                icon	: Ext.Msg.ERROR,
                                                msg     : action.result.msg,
                                                buttons : Ext.Msg.OK
                                            });
											Ext.getCmp('xt_starttime').focus();
                                        }
                                    });
                                }
                            }
                        }
                    ]
                });

                win_register = Ext.widget('window', {
                    title           : 'INPUT DATA',
                    width			 : 430,
                    autoheight		: true,
                    modal			 : false,
                    constrain       : true,
                    layout          : 'fit',
                    animateTarget   : 'btn_register',
                    items           : form_register,
					bodyStyle    	: { background :'rgba(122, 0, 61, 1); padding-bottom: 5px;'},
                    listeners       : {
                            activate:function(){
                                Ext.getCmp('btn_refresh').disable();
                                Ext.getCmp('btn_search').disable();
                                Ext.getCmp('btn_register').disable();
                                Ext.getCmp('btn_update').disable();
                                Ext.getCmp('btn_cancel').disable();
                            },
                            close:function(){
                                Ext.getCmp('btn_refresh').enable();
                                Ext.getCmp('btn_search').enable();
                                Ext.getCmp('btn_register').enable();
                                Ext.getCmp('btn_update').enable();
                                Ext.getCmp('btn_cancel').enable();
                            }
                     }
                 });
            }
            win_register.show();
        }
        /*======================register_data==============================*/
        /*======================update_data===========================*/
        function update_data() {
            var rec = grid.getSelectionModel().getSelection();
			if(rec == 0){
				Ext.Msg.show({
					title   : 'Warning',
					icon    : Ext.Msg.ERROR,
					msg     : "No data selected.",
					button  : Ext.Msg.OK  
				});
			}
			else{
				var win_update;
				if (!win_update) {
					var form_update = Ext.widget('form', {
						layout : {
							type  : 'vbox',
							align : 'stretch'
							},
						border     : false,
						autoScroll : false,
						bodyPadding: 10,

						fieldDefaults :{
							labelWidth: 120,
							labelStyle: 'font-weight:bold',
							msgTarget : 'side'
						},
						defaults      : {
							margins : '0 0 5 0'
						},
						items         : [
							{
								xtype	: 'hiddenfield',
								name	: 'xt_type',
								value	: 'update',
							},
							{
								xtype	: 'hiddenfield',
								id		: 'xt_idrpa_upd',
								name	: 'xt_idrpa_upd',
								value	: rec[0].data.id_rpa,
							},
							{
								xtype 				: 'datefield',
								id					: 'xt_date_upd',
								name				: 'xt_date_upd',
								emptyText			: 'SELECT DATE',
								fieldLabel			: 'DATE',
								beforeLabelTextTpl	: required+' ',
								labelSeparator		: '',
								allowBlank      	: false,
								format				: 'd F Y',
								submitFormat		: 'Y-m-d',
								mode				: 'local',  
								editable			: false,
								width				: 350,
								value				: rec[0].data.date,
								minValue			: new Date()
							},
							{
								xtype	: 'container',
								flex	: 1,
								id		: 'cont-2',
								layout	: 'anchor',
								padding	: '5 0 5 0',
								items: [
									{
										xtype	: 'container',
										flex	: 1,
										id		: 'cont-3',
										layout	: 'hbox',
										padding	: '0 0 5 0',
										items: [
											{
												xtype				: 'timefield',
												id					: 'xt_starttime_upd',
												name				: 'xt_starttime_upd',
												emptyText			: 'START',
												fieldLabel			: 'TIME',
												beforeLabelTextTpl	: required+' ',
												labelSeparator		: '',
												minValue			: '08:10',
												maxValue			: '17:30',
												increment			: 15,
												format				: 'H:i',
												width				: 250,
												allowBlank			: false,
												value				: rec[0].data.start_time,
												listeners			:{
													select : function(){
														Ext.getCmp('xt_endtime_upd').enable();
													},
													change : function(f, new_val){
														var valtime = Ext.getCmp('xt_starttime_upd').getValue();
														var valendtime = Ext.getCmp('xt_endtime_upd').getValue();
														if (valtime == null){
															Ext.getCmp('xt_endtime_upd').setValue("");
															Ext.getCmp('xt_endtime_upd').disable();
														}
														else{
															var sttimetemp = Ext.Date.format(Ext.getCmp('xt_starttime_upd').getValue(), 'H:i');
															var endtimetemp = Ext.Date.format(Ext.getCmp('xt_endtime_upd').getValue(), 'H:i');
															
															var jam		   = (parseInt(sttimetemp.substring(0, 2)));
															var menit	   = sttimetemp.substring(3, 5);
															
															var endjam	   = (parseInt(endtimetemp.substring(0, 2)));
															var endmenit   = endtimetemp.substring(3, 5);
															
															if (jam >= 24){ jam = jam-24 }else{ jam = jam; }
															if (jam <= 9){ var sttime = '0'+jam+':'+menit; }else{ var sttime = jam+':'+menit; }
															Ext.getCmp('xt_endtime_upd').setMinValue( sttime );
															
															if (jam <= 9){ var sttime2 = '0'+jam+menit; }else{ var sttime2 = jam+menit; }
															
															if (endjam >= 24){ endjam = endjam-24 }else{ endjam = endjam; }
															if (endjam <= 9){ var endtime2 = '0'+endjam+endmenit; }else{ var endtime2 = endjam+endmenit; }
															
															if(sttime2 >= endtime2){
																Ext.getCmp('xt_endtime_upd').setValue("");
															}
														}
													}
												}
											},
											{xtype : 'label', html : '&nbsp;-&nbsp;'},
											{
												xtype				: 'timefield',
												id					: 'xt_endtime_upd',
												name				: 'xt_endtime_upd',
												emptyText			: 'END',
												allowBlank			: false,
												//disabled			: true,
												increment			: 15,
												format				: 'H:i',
												minValue			: '08:10',
												maxValue			: '17:30',
												width				: 130,
												value				: rec[0].data.end_time,
												allowBlank			: false,
											}
										]
									}
								]
							},
							{
								xtype			: 'textfield',
								id				: 'xt_dept_upd',
								name			: 'xt_dept_upd',
								fieldLabel		: 'DEPARTMENT',
								emptyText		: 'DEPARTMENT',
								allowBlank		: false,
								beforeLabelTextTpl:required+' ',
								labelSeparator	: '',
								width			: 350,
								value			: rec[0].data.dept,
								listeners       : {
									change : function(f, new_val) {
										f.setValue(new_val.toUpperCase());
									}
								}
							},
							{
								xtype				: 'textfield',
								id					: 'xt_incharge_upd',
								name				: 'xt_incharge_upd',
								fieldLabel			: 'INCHARGE',
								emptyText 			: 'INCHARGE / USERNAME',
								beforeLabelTextTpl	: required+' ',
								labelSeparator		: '',
								width				: 350,
								allowBlank			: false,
								value				: rec[0].data.incharge,
								listeners       	: {
									change : function(f, new_val) {
										f.setValue(new_val.toUpperCase());
									}
								}
							},
							{
								xtype			: 'textareafield',
								id				: 'xt_purpose_upd',
								name			: 'xt_purpose_upd',
								fieldLabel		: 'PURPOSE',
								emptyText		: 'PURPOSE',
								beforeLabelTextTpl:required+' ',
								labelSeparator	: '',
								width			: 350,
								allowBlank		: false,
								value			: rec[0].data.purpose,
								listeners       : {
									change : function(f, new_val) {
										f.setValue(new_val.toUpperCase());
									}
								}
							},
							{
								xtype			: 'textareafield',
								id				: 'xt_remark_upd',
								name			: 'xt_remark_upd',
								fieldLabel		: 'REMARK',
								emptyText		: 'REMARK',
								beforeLabelTextTpl:'&nbsp;&nbsp;&nbsp;',
								labelSeparator	: '',
								width			: 350,
								allowBlank		: true,
								value			: rec[0].data.remark,
								listeners       : {
									change : function(f, new_val) {
										f.setValue(new_val.toUpperCase());
									}
								}
							}
						],
						buttons : [
						   {
								text    	: 'UPDATE',
								iconCls		: 'icon-edit-icon8',
								formBind	: true,
								handler  	: function() {
									var form = this.up('form').getForm();
									var popwindow = this.up('window');
									if (form.isValid()) {
										form.submit({
											url             : 'resp/resp_rpa.php',
											waitMsg         : 'Sending your data...',
											submitEmptyText : false,

											success : function(form, action) {
												ds_view_rpa.loadPage(1);
												popwindow.close();
											   
												Ext.Msg.show({
													title   : 'Success',
													icon	: Ext.Msg.INFO,
													msg     : action.result.msg,
													buttons : Ext.Msg.OK
												});
											},

											failure : function(form, action) {
												Ext.Msg.show({
													title   : 'Failure',
													icon	: Ext.Msg.ERROR,
													msg     : action.result.msg,
													buttons : Ext.Msg.OK
												});
												
												Ext.getCmp('xt_starttime_upd').reset();
												Ext.getCmp('xt_endtime_upd').reset();
												Ext.getCmp('xt_endtime_upd').disable();
												Ext.getCmp('xt_starttime_upd').focus();
											}
										});
									}
								}
							}
						]
					});

					win_update = Ext.widget('window', {
						title           : 'EDITING DATA',
						width			 : 430,
						autoheight		: true,
						modal			 : false,
						constrain       : true,
						layout          : 'fit',
						animateTarget   : 'btn_update',
						items           : form_update,
						bodyStyle    	: { background :'rgba(122, 0, 61, 1); padding-bottom: 5px;'},
						listeners       : {
								activate:function(){
									Ext.getCmp('btn_refresh').disable();
									Ext.getCmp('btn_search').disable();
									Ext.getCmp('btn_register').disable();
									Ext.getCmp('btn_update').disable();
									Ext.getCmp('btn_cancel').disable();
								},
								close:function(){
									Ext.getCmp('btn_refresh').enable();
									Ext.getCmp('btn_search').enable();
									Ext.getCmp('btn_register').enable();
									Ext.getCmp('btn_update').enable();
									Ext.getCmp('btn_cancel').enable();
								}
						 }
					 });
				}
				win_update.show();
			}
        }
        /*======================update_data==============================*/
        //	function edit data
		/*	function update_data(widget, event){
				var rec = grid.getSelectionModel().getSelection();
				if (rec == 0){
					Ext.Msg.show({
						title	: 'Failure - Updating Data',
						icon	: Ext.Msg.INFO,
						msg		: 'Select your data for Update',
						button	: Ext.Msg.OK
					})
				}
				else{
					var win_update;
					if(!win_update){
						var form_update = Ext.widget('form',{
							layout			: { type	: 'vbox',
												align	: 'stretch'
											},
							border			: false,
							autoScroll		: false,
							bodyPadding		: 10,
							fieldDefaults	: {
												labelWidth	: 140,
												msgTarget	: 'side'
											},
							defaults		: { margins : '0 0 10 0' },
							bodyStyle		: { background :'rgba(184, 216, 216, 1)' },
							items			: [
								{
									xtype		: 'container',
									anchor		: '100%',
									layout		: 'hbox',
									padding		: '5px',
									items		: [
										{
											xtype		: 'container',
											flex		: 1,
											layout		: 'anchor',
											height		: 300,
											items		: [
												{
													xtype	: 'hiddenfield',
													name	: 'xt_type',
													value	: 'update',
													readOnly:true,
													handler	: function(){
													//	ds_order.proxy.setExtraParam('xt_type',Ext.getCmp('xt_type').getValue());
													}
												},
												{
													xtype	: 'hiddenfield',
													id		: 'xt_id_order',
													name	: 'xt_id_order',
													readOnly:true,
													value	: rec[0].data.id_order
												},
												{
													xtype           	: 'textfield',
													id              	: 'xt_orderno',
													name            	: 'xt_orderno',
													fieldLabel      	: 'ORDER NO',
													emptyText       	: 'ORDER NUMBER',
													beforeLabelTextTpl	: '&nbsp;&nbsp;&nbsp;',
													labelSeparator		: '',
													readOnly			: true,
													allowBlank      	: false,
													labelWidth			: 90,
													width				: 350,
													value				: rec[0].data.order_no,
													listeners       	: {
														change : function(f, new_val) {
															f.setValue(new_val.toUpperCase());
														}
													}
												},
												{
													xtype           	: 'textfield',
													id              	: 'xt_item_name',
													name            	: 'xt_item_name',
													fieldLabel      	: 'JIG NAME',
													emptyText       	: 'JIG NAME',
													beforeLabelTextTpl	: required+' ',
													labelSeparator		: '',
													allowBlank      	: false,
													labelWidth			: 90,
													width				: 350,
													value				: rec[0].data.item_name,
													listeners       	: {
														change : function(f, new_val) {
															f.setValue(new_val.toUpperCase());
														}
													}
												},
												{
													xtype           	: 'textfield',
													id              	: 'xt_jigno',
													name            	: 'xt_jigno',
													fieldLabel      	: 'JIG NO',
													emptyText       	: 'JIG NO',
													beforeLabelTextTpl	: required+' ',
													labelSeparator		: '',
													allowBlank      	: false,
													labelWidth			: 90,
													width				: 350,
													value				: rec[0].data.jigno,
													listeners       	: {
														change : function(f, new_val) {
															f.setValue(new_val.toUpperCase());
														}
													}
												},
												{
													xtype           	: 'textfield',
													id              	: 'xt_model_name',
													name            	: 'xt_model_name',
													fieldLabel      	: 'MODEL NAME',
													emptyText       	: 'MODEL NAME',
													beforeLabelTextTpl	: required+' ',
													labelSeparator		: '',
													allowBlank      	: false,
													labelWidth			: 90,
													width				: 350,
													value				: rec[0].data.modname,
													listeners       	: {
														change : function(f, new_val) {
															f.setValue(new_val.toUpperCase());
														}
													}
												},
												{
													xtype           	: 'textfield',
													id              	: 'xt_rank',
													name            	: 'xt_rank',
													fieldLabel      	: 'RANK',
													emptyText       	: 'RANK',
													beforeLabelTextTpl	: '&nbsp;&nbsp;&nbsp;',
													labelSeparator		: '',
													labelWidth			: 90,
													width				: 350,
													value				: rec[0].data.rank,
													listeners       	: {
														change : function(f, new_val) {
															f.setValue(new_val.toUpperCase());
														}
													}
												},
												{
													xtype           	: 'textfield',
													id              	: 'xt_user',
													name            	: 'xt_user',
													fieldLabel      	: 'USER',
													emptyText       	: 'USER',
													beforeLabelTextTpl	: required+' ',
													labelSeparator		: '',
													allowBlank      	: false,
													labelWidth			: 90,
													width				: 350,
													value				: rec[0].data.user,
													listeners       	: {
														change : function(f, new_val) {
															f.setValue(new_val.toUpperCase());
														}
													}
												},
												{
													xtype           	: 'textfield',
													id              	: 'xt_requestor',
													name            	: 'xt_requestor',
													fieldLabel      	: 'REQUESTOR',
													emptyText       	: 'Requestor',
													beforeLabelTextTpl	: required+' ',
													labelSeparator		: '',
													allowBlank      	: false,
													labelWidth			: 90,
													width				: 350,
													value				: rec[0].data.requestor,
													listeners       	: {
														change : function(f, new_val) {
															f.setValue(new_val.toUpperCase());
														}
													}
												},
												{
													xtype           	: 'textfield',
													id              	: 'xt_pic',
													name            	: 'xt_pic',
													fieldLabel      	: 'PIC',
													emptyText       	: 'PIC',
													beforeLabelTextTpl	: required+' ',
													labelSeparator		: '',
													allowBlank      	: false,
													labelWidth			: 90,
													width				: 350,
													value				: rec[0].data.pic,
													listeners       	: {
														change : function(f, new_val) {
															f.setValue(new_val.toUpperCase());
														}
													}
												},
												
											]
										},
										{
											xtype		: 'container',
											flex		: 1,
											layout		: 'anchor',
											height		: 300,
											items		: [
												{
													xtype 				: 'datefield',
													id					: 'xt_order_rcv',
													name				: 'xt_order_rcv',
													fieldLabel			: 'ORDER RECEIVED',
													beforeLabelTextTpl	: required+' ',
													labelSeparator		: '',
													allowBlank			: false,
													format				: 'd F Y',
													submitFormat		: 'Y-m-d',
													mode				: 'local',  
													editable			: false,
													width				: 350,
													value				: rec[0].data.order_received,
												},
												{
													xtype 				: 'datefield',
													id					: 'xt_reg_deliv',
													name				: 'xt_reg_deliv',
													fieldLabel			: 'REQUEST DELIVERY',
													beforeLabelTextTpl	: '&nbsp;&nbsp;&nbsp;',
													labelSeparator		: '',
													format				: 'd F Y',
													submitFormat		: 'Y-m-d',
													mode				: 'local',  
													editable			: false,
													width				: 350,
													value				: rec[0].data.request_delivery,
												},
												{
													xtype 				: 'datefield',
													id					: 'xt_fns_date',
													name				: 'xt_fns_date',
													fieldLabel			: 'FINISH DATE',
													beforeLabelTextTpl	: '&nbsp;&nbsp;&nbsp;',
													labelSeparator		: '',
													format				: 'd F Y',
													submitFormat		: 'Y-m-d',
													mode				: 'local',  
													editable			: false,
													width				: 350,
													value				: rec[0].data.finish_date,
												},
												{
													xtype           	: 'combo',
													id              	: 'xt_status',
													name            	: 'xt_status',
													fieldLabel      	: 'STATUS',
													beforeLabelTextTpl	: required+' ',
													labelSeparator		: '',
													queryMode       	: 'local',
													displayField    	: 'regno_name',
													valueField      	: 'id_regno',
													emptyText       	: 'SELECT INPUT TYPE',
													editable        	: false,
													allowBlank      	: false,
													width				: 350,
												//	store           	: ds_combo_status,
													value				: rec[0].data.status,
													listeners       	: {
														afterrender : function(field) {
															field.focus(false, 1000);
														//	ds_combo_status.proxy.setExtraParam('idasc','regno_name');
														//	ds_combo_status.proxy.setExtraParam('regno_code','ord_status');
														//	ds_combo_status.proxy.setExtraParam('ascdesc','DESC');
														//	ds_combo_status.loadPage(1);
														},
														change : function(f, new_val) {
															Ext.getCmp('xt_status_id').setValue(Ext.getCmp('xt_status').getValue());
														}
													}
												},
												{
													xtype       : 'hiddenfield',
													id          : 'xt_status_id',
													name        : 'xt_status_id',
													fieldLabel  : 'STATUS ID',
													value		: rec[0].data.status_id,
													hidden		:true
												},
												{
													xtype           	: 'textareafield',
													id              	: 'xt_remark',
													name            	: 'xt_remark',
													fieldLabel      	: 'REMARK',
													emptyText       	: 'REMARK',
													beforeLabelTextTpl	: '&nbsp;&nbsp;&nbsp;',
													labelSeparator		: '',
													width				: 350,
													value				: rec[0].data.remarks,
													listeners       	: {
														change : function(f, new_val) {
															f.setValue(new_val.toUpperCase());
														}
													}
												},
											]
										}
									]
								}
							],
							buttons		: [
								{
									text    	: 'U P D A T E',
									iconCls		: 'icon-update-black',
									width		: 180,
									height		: 30,
									handler		: function(field){
										ds_order.proxy.setExtraParam('xt_type','update');
										var form = this.up('form').getForm();
										var popwindow = this.up('window');
										if (form.isValid()) {
											form.submit({
												url 			: 'resp/resp_order.php',
												waitMsg			: 'sending data',
												submitEmptyText : false,
												success			: function(form, action) {
													Ext.Msg.show({
														title	: 'Success - Updating Registration JIG Data',
														icon	: Ext.Msg.INFO,
														msg		: action.result.msg,
														buttons	: Ext.Msg.OK
													});
													ds_order.loadPage(1);
													popwindow.close();
													
												},
												failure			: function(form, action) {
													Ext.Msg.show({
														title	: 'Failure - Updating Registration JIG Data',
														icon	: Ext.Msg.ERROR,
														msg		: action.result.msg,
														buttons	: Ext.Msg.OK
													});
												}
											})
										}
									}
								}
							],
						});
						
						win_update = Ext.widget('window', {
							title			: 'UPDATE ORDER JIG AND CHECKER DATA',
							width			: 800,
							height			: 320,
							modal			: false,
							constrain		: true,
							layout			: 'fit',
							animateTarget	: 'btn_actions_grid',
							items			: form_update,
							bodyStyle    	: { background :'rgba(0,159,162,0.9); padding-bottom: 5px;'},
							listeners		: {
										activate:function(){
											Ext.getCmp('btn_refresh').disable();
											Ext.getCmp('btn_search').disable();
											Ext.getCmp('btn_actions_grid').disable();
											Ext.getCmp('btn_view_grid').disable();
										},
										close:function(){
											Ext.getCmp('btn_refresh').enable();
											Ext.getCmp('btn_search').enable();
											Ext.getCmp('btn_actions_grid').enable();
											Ext.getCmp('btn_view_grid').enable();
										}
							}
						});
						
					}
					win_update.show();
				}
			}
		//	---- end of update_data ---- //	***/
		/*======================cancel_data===========================*/
           function cancel_data(widget, event) {
                var rec = grid.getSelectionModel().getSelection();
                if(rec == 0){
                    Ext.Msg.show({
                        title   : 'Warning',
                        icon    : Ext.Msg.ERROR,
                        msg     : "No data selected.",
                        button  : Ext.Msg.OK  
                    });
                }
                else{
                    var win_cancel;
                    if (!win_cancel) {
                        var form_cancel = Ext.widget('form', {
                            layout			: {
                                type	: 'vbox',
                                align	: 'stretch'
                            },
                            border			: false,
                            bodyPadding		: 10,

                            fieldDefaults	: {
                                labelWidth	: 150,
                                labelStyle	: 'font-weight:bold',
                                msgTarget	: 'side'
                            },
                            defaults		: {
                                margins	: '0 0 10 0'
                            },
                            items			: [
                                {
                                    xtype	: 'label',
                                    html	: 'Are you sure to CANCEL this reservation ??'
                                },
								{
									xtype	: 'hiddenfield',
									name	: 'xt_idrpa',
									value	: rec[0].data.id_rpa
								},
								{
									xtype	: 'hiddenfield',
									name	: 'xt_type',
									value	: 'cancel',
								}
                            ],
                            buttons			: [
                                {
                                    text	: 'CANCEL',
                                    iconCls	: 'icon-cancel-icon8',
                                    handler	: function() {
                                        var form = this.up('form').getForm();
                                        var popwindow = this.up('window');
                                        if (form.isValid()) {
                                            form.submit({
                                                url		: 'resp/resp_rpa.php',
                                                waitMsg	: 'sending data',

                                                success	: function(form, action) {
                                                    popwindow.close();
                                                    ds_view_rpa.loadPage();

                                                    Ext.Msg.show({
                                                        title   : 'Success',
                                                        icon	: Ext.Msg.INFO,
                                                        msg     : action.result.msg,
                                                        buttons : Ext.Msg.OK
                                                    });
                                                },

                                                failure	: function(form, action) {
                                                    Ext.Msg.show({
                                                        title		:'Failure - Delete Leave Data',
                                                        icon		: Ext.Msg.ERROR,
                                                        msg			: action.result.msg,
                                                        buttons		: Ext.Msg.OK
                                                    });
                                                }
                                            });
                                        }
                                    }
                                }
                            ]
                        });

                        win_cancel = Ext.widget('window', {
                            title			: 'Cancel Reservation',
							bodyStyle    	: { background :'rgba(122, 0, 61, 1); padding-bottom: 5px;'},
                            minWidth		: 380,
                            autoHeight		: true,
                            modal			: true,
                            constrain		: true,
                            layout			: 'fit',
                            animateTarget	: 'btn_cancel',
                            items			: form_cancel
                        });
                    }
                    win_cancel.show();
                }
            }
        /*======================cancel_data===========================*/
		/*combine column*/
		function combinecolumn(value, meta, record, rowIndex, colIndex, store){
			return '<b>'+value+'</b> ( ex-'+ record.get('roomcode') +' )';
		}
		/*end combine column*/
    //==========================FUNCTION==============================================================================
    //==========================VARIABLE==============================================================================
         var grouping = Ext.create('Ext.grid.feature.Grouping',{
                            groupHeaderTpl: 'Leave Date : {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
                        });
    //==========================VARIABLE==============================================================================
    //==========================GRID==================================================================================
        var grid = Ext.create('Ext.grid.Panel',{
            renderTo	: 'rpa',
            iconCls		: 'icon_grid-icon8',
            store		: ds_view_rpa,
            style		: 'margin : 0 auto; margin-bottom:20px;',
            width		: '100%',
            height	    : 450,
            autoheight	: true,
            applyTo		: 'centerPanel',
            columnLines	: true,
            stateful	: true,
            multiSelect	: true,
            features	: [grouping,{ftype: 'summary'}],
            tbar		:[{
                            xtype  : 'button',
                            id     : 'btn_refresh',
                            text   : 'Refresh',
                            tooltip: 'Refresh',
                            iconCls: 'icon-refresh-icon8',
                            scale  : 'medium',
                            handler: function() {
								ds_view_rpa.proxy.setExtraParam('src_date', '' );
                                ds_view_rpa.loadPage(1);
                            }
                        },
						{
                            xtype  : 'button',
                            id     : 'btn_register',
                            text   : 'Register RPA',
                            iconCls: 'icon-register-icon8',
                            scale  : 'medium',
                            tooltip: 'Register your reservation',
                            handler: register_data
                        },
                        {
                            xtype  : 'button',
                            id     : 'btn_update',
                            text   : 'Edit RPA',
                            iconCls: 'icon-edit-icon8',
                            tooltip: 'Editing your selection reservation',
                            scale  : 'medium',
                            handler : update_data
                        },
						{
                            xtype  : 'button',
                            id     : 'btn_cancel',
                            text   : 'Cancel RPA',
                            iconCls: 'icon-cancel-icon8',
                            tooltip: 'Cancel your selection reservation',
                            scale  : 'medium',
                            handler : cancel_data
                        },
						'->',
						{
                            xtype 			: 'datefield',
                            id				: 'xt_date_src',
                            name			: 'xt_date_src',
							emptyText       : 'SEARCH DATE',
							labelSeparator	: '',
                            format			: 'd F Y',
                            submitFormat	: 'Y-m-d',
                            mode			: 'local',  
							anchor			: '100%',
                            editable		: false,
                            labelWidth		: 80,
							height			: 25,
							trigger			: false,
							width			: 140
                        },
						{
                            xtype  		: 'button',
                            id     		: 'btn_search',
							text		: 'SEARCH',
                            iconCls		: 'icon-searchs-icon8',
                            scale  		: 'medium',
                            tooltip		: 'Search',
                            handler		: function(){
											ds_view_rpa.proxy.setExtraParam('src_date', Ext.getCmp('xt_date_src').getValue() );
											ds_view_rpa.loadPage(1);
										}
                        },
                        '-',
                        {
							xtype		: 'label',
							text		: Ext.Date.format(new Date(), 'l, d F Y'),
							margins		: '15 5 0 5'
						}, 
						'-',
						clock
            ],
            columns     : [
                            { header: 'NO', xtype: 'rownumberer',       width: 50,  height: 40,         sortable: false },
							{ header: 'id_rpa',	dataIndex: 'id_rpa',    flex:1, tdCls:'wrap-text',  align:'left', hidden:true},
							{ header: 'DEPT',   	dataIndex: 'dept',    	flex:1, tdCls:'wrap-text',  align:'left'},
							{ header: 'DATE', 		dataIndex: 'date',    width:100, tdCls:'wrap-text',  align:'center',renderer: Ext.util.Format.dateRenderer('d F Y')},
							{ header: 'START TIME', dataIndex: 'start_time',    width:90, tdCls:'wrap-text',  align:'center'},
							{ header: 'END TIME',   dataIndex: 'end_time',    width:90, tdCls:'wrap-text',  align:'center'},
							{ header: 'INCHARGE',   dataIndex: 'incharge',    flex:1, tdCls:'wrap-text',  align:'left'},
							{ header: 'PURPOSE',   	dataIndex: 'purpose',    width:250, tdCls:'wrap-text',  align:'left'},
							{ header: 'REMARK',   	dataIndex: 'remark',    flex:1, tdCls:'wrap-text',  align:'left'},
            ],
            listeners		: {
                                render: {
                                    fn: function(){
                                        Ext.fly(clock.getEl().parent()).addCls('x-status-text-panel').createChild({cls:'spacer'});

                                     Ext.TaskManager.start({
                                         run: function(){
                                             Ext.fly(clock.getEl()).update(Ext.Date.format(new Date(), 'g:i:s A'));
                                         },
                                         interval: 1000
                                     });
                                    },
                                    delay: 100
                                }
            }
		});
    //==========================GRID===============================================================================================
});
