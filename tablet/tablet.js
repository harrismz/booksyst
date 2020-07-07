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
    //==========================DS STORE===========================================================================
        /*=========ds_view==========*/
        Ext.define('M_view',{
            extend: 'Ext.data.Model',
            fields: ['id_renttablet','tabletcode','tabletcode2','date','start_time','end_time','dept','incharge','purpose','remark']
        });
    
        var ds_view = Ext.create('Ext.data.Store',{
            model	: 'M_view',
            autoLoad: true,
            proxy	: {
                type	: 'ajax',
                api     : {
                    read    : 'json/json_viewtablet.php',
                },
                reader	: {
                    type    : 'json',
                    root	: 'data'
                }
            }
        });
        /*=========ds_view==========*/
		/*=========ds_tabletdata==========*/
        Ext.define('M_tabletdata',{
            extend: 'Ext.data.Model',
            fields: ['id_tablet','tabletname','position','tabletname2']
        });
        var ds_tabletdata = Ext.create('Ext.data.Store',{
            model	: 'M_tabletdata',
            autoLoad: true,
            proxy	: {
                type	: 'ajax',
                api     : {
                    read    : 'json/json_tabletdata.php',
                },
                reader	: {
                    type    : 'json',
                    root	: 'data'
                }
            }
        });
        /*=========ds_tabletdata==========*/
        /*=========ds_tabletdata_all==========*/
        Ext.define('M_tabletdata_all',{
            extend: 'Ext.data.Model',
            fields: ['id_tablet','tabletname','position','tabletname2']
        });
        var ds_tabletdata_all = Ext.create('Ext.data.Store',{
            model	: 'M_tabletdata',
            autoLoad: true,
            proxy	: {
                type	: 'ajax',
                api     : {
                    read    : 'json/json_tabletdata_all.php',
                },
                reader	: {
                    type    : 'json',
                    root	: 'data'
                }
            }
        });
        /*=========ds_tabletdata_all==========*/
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
                            xtype				: 'combo',
                            id					: 'xt_tablet',
                            name				: 'xt_tablet',
                            fieldLabel			: 'SELECT LICENSE MEETING',
                            emptyText			: 'SELECT LICENSE MEETING',
                            beforeLabelTextTpl	: required+' ',
                            labelSeparator		: '',
                            typeAhead			: true,
                            editable			: true,
                            queryMode			: 'local',
                            store				: ds_tabletdata,
                            displayField		: 'tabletname2',
                            valueField			: 'id_tablet',
							allowBlank			: false,
                            listConfig			:{
                                getInnerTpl	: function() {
                                    return '<div>{tabletname2}</div>';
                                }
                            },
                            
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
                                        url             : 'resp/resp_tablet.php',
                                        waitMsg         : 'Sending your data...',
                                        submitEmptyText : false,

                                        success : function(form, action) {
                                            Ext.getCmp('xt_tablet').focus(false, 1000);
                                            ds_view.loadPage(1);
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
								id		: 'xt_idrenttablet_upd',
								name	: 'xt_idrenttablet_upd',
								value	: rec[0].data.id_renttablet,
							},
							{
								xtype				: 'combo',
								id					: 'xt_tablet_upd',
								name				: 'xt_tablet_upd',
								fieldLabel			: 'SELECT License MEETING',
								emptyText			: 'SELECT License MEETING',
								beforeLabelTextTpl	: required+' ',
								labelSeparator		: '',
								typeAhead			: true,
								editable			: true,
								queryMode			: 'local',
								store				: ds_tabletdata,
								displayField		: 'tabletname',
								valueField			: 'tabletname',
								allowBlank			: false,
								value				: rec[0].data.tabletcode,
								listConfig			:{
									getInnerTpl	: function() {
										return '<div><b>{tabletname2}</b></div>';
									}
								},
								
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
								xtype	: 'textfield',
								id		: 'xt_dept_upd',
								name	: 'xt_dept_upd',
								fieldLabel	: 'DEPARTMENT',
								emptyText: 'DEPARTMENT',
								allowBlank			: false,
								beforeLabelTextTpl:required+' ',
								labelSeparator: '',
								width: 350,
								value				: rec[0].data.dept,
								listeners       	: {
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
								beforeLabelTextTpl	:required+' ',
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
								xtype	: 'textareafield',
								id		: 'xt_purpose_upd',
								name	: 'xt_purpose_upd',
								fieldLabel	: 'PURPOSE',
								emptyText	: 'PURPOSE',
								beforeLabelTextTpl:required+' ',
								labelSeparator: '',
								width: 350,
								allowBlank			: false,
								value				: rec[0].data.purpose,
								listeners       	: {
									change : function(f, new_val) {
										f.setValue(new_val.toUpperCase());
									}
								}
							},
							{
								xtype	: 'textareafield',
								id		: 'xt_remark_upd',
								name	: 'xt_remark_upd',
								fieldLabel	: 'REMARK',
								emptyText	: 'REMARK',
								beforeLabelTextTpl:'&nbsp;&nbsp;&nbsp;',
								labelSeparator: '',
								width: 350,
								allowBlank			: true,
								value				: rec[0].data.remark,
								listeners       	: {
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
											url             : 'resp/resp_tablet.php',
											waitMsg         : 'Sending your data...',
											submitEmptyText : false,

											success : function(form, action) {
												Ext.getCmp('xt_tablet_upd').focus(false, 1000);
												ds_view.loadPage(1);
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
		/*======================update_data===========================*/
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
									name	: 'xt_idrenttablet',
									value	: rec[0].data.id_renttablet
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
                                                url		: 'resp/resp_tablet.php',
                                                waitMsg	: 'sending data',

                                                success	: function(form, action) {
                                                    popwindow.close();
                                                    ds_view.loadPage();

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
		/*======================search data===========================*/
        function search_data() {
            var win_search;
            if (!win_search) {
                var form_search = Ext.widget('form',{
                    id 				: 'form_search',
                    layout			: {
                        type		: 'vbox',
                        align		: 'stretch'
                    },
                    border			: false,
                    bodyPadding		: 10,
                    fieldDefaults	: {
                        labelWidth	: 120,
                        labelStyle	: 'font-weight:bold',
                        msgTarget	: 'side'
                    },
                    defaults		: {
                        magins		: '0 0 10 0'
                    },
                    items			: [
                        {
                            xtype 				: 'datefield',
                            id					: 'xt_date_src',
                            name				: 'xt_date_src',
                            fieldLabel			: 'DATE',
                            labelSeparator		: '',
                       //     allowBlank      	: false,
                            format				: 'd F Y',
                            submitFormat		: 'Y-m-d',
                            mode				: 'local',  
                            editable			: false,
                            width				: 350,
                        },
						{
                            xtype				: 'combo',
                            id					: 'xt_tablet_src',
                            name				: 'xt_tablet_src',
                            fieldLabel			: 'SELECT License Meeting',
                            emptyText			: 'SELECT License Meeting',
                            labelSeparator		: '',
                            typeAhead			: true,
                            editable			: true,
                            queryMode			: 'local',
                            store				: ds_tabletdata_all,
                            displayField		: 'tabletname2',
                            valueField			: 'id_tablet',
                            listeners			: {
                                change	: function(f,new_val) {
                                    ds_tabletdata_all.loadPage(1);
                                }
                            },
                            listConfig			:{
                                getInnerTpl	: function() {
                                    return '<div>{tabletname2}</div>';
                                }
                            },
                            
                        }
                    ],
                    buttons			: [
                        {
                            text		: 'Reset',
                            iconCls		: 'icon-reset-icon8',
                            handler		: function(){
                                this.up('form').getForm().reset();
                                ds_view.proxy.setExtraParam('src_tabletcode', '' );
                            	ds_view.proxy.setExtraParam('src_date', '' );
                                ds_view.loadPage(1);
                            }
                        },
                        {
                            text		: 'Search',
                            iconCls		: 'icon-searchs-icon8',
                            handler		: function(){
                                //ds_view.proxy.setExtraParam('src_tabletcode', Ext.getCmp('xt_tablet_src').getValue() );
                            	//ds_view.proxy.setExtraParam('src_date', Ext.getCmp('xt_date_src').getValue() );
                            	//ds_view.loadPage(1);
								
								var form = this.up('form').getForm();
                                var popwindow = this.up('window');
                                if (form.isValid()) {
									ds_view.proxy.setExtraParam('src_tabletcode', Ext.getCmp('xt_tablet_src').getValue() );
									ds_view.proxy.setExtraParam('src_date', Ext.getCmp('xt_date_src').getValue() );
									ds_view.loadPage(1);
									popwindow.close();
                                }
								
                            }
                        }
                    ]
                });
                win_search = Ext.widget('window',{
                    title			: 'Search by field',
                    minWidth		: 450,
                    autoheight		: true,
                    modal			: false,
                    constrain		: true,
                    layout			: 'fit',
                    animateTarget	: 'btn_search',
                    items			: form_search,
                    bodyStyle    	: { background :'rgba(122, 0, 61, 1); padding-bottom: 5px;'},
                    listeners		: {
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
            win_search.show();

        }
        /*======================search data===========================*/
		
		/*combine column*/
		/*function combinecolumn(value, meta, record, rowIndex, colIndex, store){
			return '<b>'+value+'</b> ( ex-'+ record.get('tabletcode') +' )';
		}*/
		/*end combine column*/
    //==========================FUNCTION==============================================================================
    //==========================VARIABLE==============================================================================
         var grouping = Ext.create('Ext.grid.feature.Grouping',{
                            groupHeaderTpl: 'Leave Date : {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
                        });
    //==========================VARIABLE==============================================================================
    //==========================GRID==================================================================================
        var grid = Ext.create('Ext.grid.Panel',{
            renderTo	: 'tablet',
            iconCls		: 'icon_grid-icon8',
            store		: ds_view,
            style		: 'margin : 0 auto; margin-bottom:20px;',
            width		: '100%',
            height	    : 450,
            autoheight	: true,
            applyTo		: 'centerPanel',
            columnLines	: true,
            stateful	: true,
            multiSelect	: true,
            /*selModel	: sm,
            viewConfig	: { enableTextSelection: true, },*/
            features	: [grouping,{ftype: 'summary'}],
            tbar		:[{
                            xtype  : 'button',
                            id     : 'btn_refresh',
                            text   : 'Refresh',
                            tooltip: 'Refresh',
                            iconCls: 'icon-refresh-icon8',
                            scale  : 'medium',
                            handler: function() {
								ds_view.proxy.setExtraParam('src_tabletcode', '' );
                            	ds_view.proxy.setExtraParam('src_date', '' );
                                ds_view.loadPage(1);
                            }
                        },
                        {
                            xtype  : 'button',
                            id     : 'btn_search',
                            text   : 'Search',
                            iconCls: 'icon-searchs-icon8',
                            scale  : 'medium',
                            tooltip: 'Search',
                            handler: search_data
                        },
                        {
                            xtype  : 'button',
                            id     : 'btn_register',
                            text   : 'Register License Meeting',
                            iconCls: 'icon-register-icon8',
                            scale  : 'medium',
                            tooltip: 'Register your reservation',
                            handler: register_data
                        },
                        {
                            xtype  : 'button',
                            id     : 'btn_update',
                            text   : 'Edit License Meeting Reservation',
                            iconCls: 'icon-edit-icon8',
                            tooltip: 'Editing your selection reservation',
                            scale  : 'medium',
                            handler : update_data
                        },
						{
                            xtype  : 'button',
                            id     : 'btn_cancel',
                            text   : 'Cancel License Meeting',
                            iconCls: 'icon-cancel-icon8',
                            tooltip: 'Cancel your selection reservation',
                            scale  : 'medium',
                            handler : cancel_data
                        },
                        '->',
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
							{ header: 'id_renttablet',	dataIndex: 'id_renttablet',    flex:1, tdCls:'wrap-text',  align:'left', hidden:true},
							{ header: 'License MEETING NAME',	dataIndex: 'tabletcode2', width:250, tdCls:'wrap-text',  align:'left'},
							{ header: 'DATE', 		dataIndex: 'date',    width:90, tdCls:'wrap-text',  align:'left',renderer: Ext.util.Format.dateRenderer('d F Y')},
							{ header: 'START TIME', dataIndex: 'start_time',    width:90, tdCls:'wrap-text',  align:'left'},
							{ header: 'END TIME',   dataIndex: 'end_time',    width:90, tdCls:'wrap-text',  align:'left'},
							{ header: 'DEPT',   	dataIndex: 'dept',    flex:1, tdCls:'wrap-text',  align:'left'},
							{ header: 'INCHARGE',   	dataIndex: 'incharge',    flex:1, tdCls:'wrap-text',  align:'left'},
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
