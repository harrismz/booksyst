/*
 date : 10 july 2017
 repair by : harris muhammad Zaki
 request by Mr. Yudi from Mr. Muramatsu :
 if room is not exists dont reset form input
 solution :
 delete text after 468 and before 469 
 --------------------------------------
	//Ext.getCmp('xt_startdate').reset();
	//Ext.getCmp('xt_starttime').reset();
	//Ext.getCmp('xt_enddate').reset();
	//Ext.getCmp('xt_endtime').reset();
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
    //==========================DS STORE===========================================================================
        /*=========ds_view==========*/
        Ext.define('M_view',{
            extend: 'Ext.data.Model',
            fields: ['id','name','type','sdate','edate','dept','stime','etime','incharge','purpose','remark','input_nik','input_date']
        });
        var ds_view = Ext.create('Ext.data.Store',{
            model	: 'M_view',
            autoLoad: true,
            proxy	: {
                type	: 'ajax',
                api     : {
                    read    : 'json/json_viewtransact.php',
                },
                reader	: {
                    type    : 'json',
                    root	: 'data'
                }
            }
        });
        /*=========ds_view==========*/
        /*=========ds_device_type==========*/
        Ext.define('M_devicetype',{
            extend: 'Ext.data.Model',
            fields: ['typeid','typename']
        });
        var ds_devicetype = Ext.create('Ext.data.Store',{
            model	: 'M_devicetype',
            autoLoad: true,
            proxy	: {
                type	: 'ajax',
                api     : {
                    read    : 'json/json_devicetype.php',
                },
                reader	: {
                    type    : 'json',
                    root	: 'data'
                }
            }
        });
		/*=========ds_device_type==========*/
		/*=========ds_device==========*/
        Ext.define('M_device',{
            extend: 'Ext.data.Model',
            fields: ['id','name']
        });
        var ds_device = Ext.create('Ext.data.Store',{
            model	: 'M_device',
            autoLoad: true,
            proxy	: {
                type	: 'ajax',
                api     : {
                    read    : 'json/json_device.php',
                },
                reader	: {
                    type    : 'json',
                    root	: 'data'
                }
            }
        });
        /*=========ds_device==========*/
        /*=========ds_devicemaster==========*/
        Ext.define('M_devicemaster',{
            extend: 'Ext.data.Model',
            fields: ['id','type','name','status','remark']
        });
        var ds_devicemaster = Ext.create('Ext.data.Store',{
			model	: 'M_devicemaster',
			autoLoad: true,
			groupField: 'type',
            proxy	: {
                type	: 'ajax',
                api     : {
                    read    : 'json/json_devicemaster.php',
                },
                reader	: {
                    type    : 'json',
                    root	: 'data'
                }
            }
        });
		/*=========ds_devicemaster==========*/
		/*=========ds_mastercar==========*/
        Ext.define('M_devicestatus',{
            extend: 'Ext.data.Model',
            fields: ['id','status']
        });
        var ds_devicestatus = Ext.create('Ext.data.Store',{
            model	: 'M_devicestatus',
            autoLoad: true,
            proxy	: {
                type	: 'ajax',
                api     : {
                    read    : 'json/json_devicestatus.php',
                },
                reader	: {
                    type    : 'json',
                    root	: 'data'
                }
            }
        });
        /*=========ds_mastercar==========*/
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
						{ 	// TYPE OF DEVICES
                            xtype				: 'combo',
                            id					: 'xt_icttype',
                            name				: 'xt_icttype',
                            fieldLabel			: 'DEVICE TYPE',
                            emptyText			: 'SELECT DEVICE TYPE',
                            beforeLabelTextTpl	: required+' ',
                            labelSeparator		: '',
                            typeAhead			: true,
                            editable			: true,
                            allowBlank			: false,
							queryMode			: 'local',
                            store				: ds_devicetype,
                            displayField		: 'typename',
                            valueField			: 'typeid',
                            listConfig			:{
                                getInnerTpl	: function() {
                                    return '<div><b>{typename}</b></div>';
                                }
							},
							listeners: {
								select: function(e) {
									// console.log(e.value);
									ds_device.proxy.setExtraParam('typeid',e.value);
									ds_device.load();
								},
								change: function() {
									Ext.getCmp('xt_ict').reset();
								}
							}
                        },
						{ 	// DEVICES
                            xtype				: 'combo',
                            id					: 'xt_ict',
                            name				: 'xt_ict',
                            fieldLabel			: 'DEVICES',
                            emptyText			: 'SELECT DEVICES',
                            beforeLabelTextTpl	: required+' ',
                            labelSeparator		: '',
                            typeAhead			: true,
                            editable			: true,
                            allowBlank			: false,
							queryMode			: 'local',
                            store				: ds_device,
                            displayField		: 'name',
                            valueField			: 'id',
                            listConfig			:{
                                getInnerTpl	: function() {
                                    return '<div><b>{name}</b></div>';
                                }
                            },
                        },
                        {	// START DATE
							xtype	: 'container',
							flex	: 1,
							id		: 'cont-1',
							layout	: 'anchor',
							padding	: '5 0 5 0',
							items: [
								{
									xtype	: 'container',
									flex	: 1,
									id		: 'cont-2',
									layout	: 'hbox',
									padding	: '0 0 5 0',
									items: [
										{
											xtype	: 'hiddenfield',
											name	: 'xt_type',
											value	: 'register',
										},
										{
											xtype 				: 'datefield',
											id					: 'xt_startdate',
											name				: 'xt_startdate',
											fieldLabel			: 'START',
											beforeLabelTextTpl	: required+' ',
											labelSeparator		: '',
											emptyText			: 'DATE',
											minValue			: new Date(),
											format				: 'd F Y',
											submitFormat		: 'Y-m-d',
											mode				: 'local',  
											editable			: false,
											allowBlank			: false,
											width				: 250,
											listeners			: {
												select : function(){
													Ext.getCmp('xt_starttime').reset();
													Ext.getCmp('xt_enddate').reset();
													Ext.getCmp('xt_endtime').reset();
													
													Ext.getCmp('xt_starttime').enable();
													Ext.getCmp('xt_enddate').disable();
													Ext.getCmp('xt_endtime').disable();
												}
											}
										},
										{xtype : 'label', html : '&nbsp;-&nbsp;'},
										{
											xtype				: 'timefield',
											id					: 'xt_starttime',
											name				: 'xt_starttime',
											beforeLabelTextTpl	: required+' ',
											labelSeparator		: '',
											emptyText			: 'TIME',
											minValue			: '01:00',
											maxValue			: '24:00',
											editable			: false,
											increment			: 15,
											format				: 'H:i',
											submitFormat		: 'H:i:s',
											width				: 130,
											allowBlank			: false,
											disabled			: true,
											listeners			: {
												select : function(){
													Ext.getCmp('xt_enddate').reset();
													Ext.getCmp('xt_endtime').reset();
													
													Ext.getCmp('xt_enddate').enable();
													Ext.getCmp('xt_endtime').disable();
												}
											}
										}
									]
								}
							]
						},
						{	// END DATE
							xtype	: 'container',
							flex	: 1,
							id		: 'cont-3',
							layout	: 'anchor',
							padding	: '5 0 5 0',
							items: [
								{
									xtype	: 'container',
									flex	: 1,
									id		: 'cont-4',
									layout	: 'hbox',
									padding	: '0 0 5 0',
									items: [
										{
											xtype 				: 'datefield',
											id					: 'xt_enddate',
											name				: 'xt_enddate',
											fieldLabel			: 'END',
											beforeLabelTextTpl	: required+' ',
											labelSeparator		: '',
											emptyText			: 'DATE',
											format				: 'd F Y',
											submitFormat		: 'Y-m-d',
											mode				: 'local',  
											minValue			: new Date(),
											editable			: false,
											allowBlank			: false,
											disabled				: true,
											width				: 250,
											listeners			:{
												select : function(){
													Ext.getCmp('xt_endtime').reset();
													Ext.getCmp('xt_endtime').enable();
												},
												change : function(f, new_val){
													var startdate	= Date.parse(Ext.getCmp('xt_startdate').getValue(), 'Y-m-d');
													var enddate		= Date.parse(Ext.getCmp('xt_enddate').getValue(), 'Y-m-d');
													var delta 		= enddate - startdate;
													var days 		= parseInt(delta / 86400000);
													//alert(startdate +'--'+ enddate+'--'+delta+'--'+days);
													if(days == 0){
														var sttimetemp = Ext.Date.format(Ext.getCmp('xt_starttime').getValue(), 'H:i');
														var jam		   = (parseInt(sttimetemp.substring(0, 2)));
														var menit	   = sttimetemp.substring(3, 5);
														if (jam >= 24){ jam = jam-24 }else{ jam = jam; }
														if (jam <= 9){ var sttime = '0'+jam+':'+menit; }else{ var sttime = jam+':'+menit; }
														Ext.getCmp('xt_endtime').setMinValue( sttime );
														//var a = Ext.getCmp('xt_endtime').getValue();
														//alert(a);
													}
													else{
														Ext.getCmp('xt_endtime').setMinValue('04:00');
													}
												}
											}
										},
										{xtype : 'label', html : '&nbsp;-&nbsp;'},
										{
											xtype				: 'timefield',
											id					: 'xt_endtime',
											name				: 'xt_endtime',
											emptyText			: 'TIME',
											allowBlank			: false,
											disabled				: true,
											editable			: false,
											increment			: 15,
											format				: 'H:i',
											minValue			: '01:00',
											maxValue			: '24:00',
											submitFormat		: 'H:i:s',
											width				: 130
										}
									]
								}
							]
						},
						{	// DEPT
							xtype				: 'textfield',
							id					: 'xt_dept',
							name				: 'xt_dept',
							fieldLabel			: 'DEPARTMENT',
							emptyText 			: 'DEPARTMENT',
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
						{	// INCHARGE
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
						{	// PURPOSE
							xtype				: 'textareafield',
							id					: 'xt_purpose',
							name				: 'xt_purpose',
							fieldLabel			: 'PURPOSE',
							emptyText 			: 'PURPOSE',
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
						{	// REMARK
							xtype				: 'textareafield',
							id					: 'xt_remark',
							name				: 'xt_remark',
							fieldLabel			: 'REMARK',
							emptyText 			: 'REMARK',
							beforeLabelTextTpl	: '&nbsp;&nbsp;&nbsp;',
							labelSeparator		: '',
							width				: 350,
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
                                        url             : 'resp/resp_icts.php',
                                        waitMsg         : 'Sending your data...',
                                        submitEmptyText : false,

                                        success : function(form, action) {
                                            Ext.getCmp('xt_ict').focus(false, 1000);
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
                                                title   : 'Failure 1',
                                                icon	: Ext.Msg.ERROR,
                                                msg     : action.result.msg,
                                                buttons : Ext.Msg.OK
                                            });
											Ext.getCmp('xt_startdate').reset();
											Ext.getCmp('xt_starttime').reset();
											Ext.getCmp('xt_enddate').reset();
											Ext.getCmp('xt_endtime').reset();
											Ext.getCmp('xt_starttime').enable();
											Ext.getCmp('xt_enddate').disable();
											Ext.getCmp('xt_endtime').disable();
											Ext.getCmp('xt_startdate').focus();
                                        }
                                    });
                                }
                            }
                        }
                    ]
                });

                win_register = Ext.widget('window', {
                    title           : 'INPUT DATA',
                    width			: 430,
                    autoheight		: true,
                    modal			: false,
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
                                Ext.getCmp('btn_masterict').disable();
                            },
                            close:function(){
                                Ext.getCmp('btn_refresh').enable();
                                Ext.getCmp('btn_search').enable();
                                Ext.getCmp('btn_register').enable();
                                Ext.getCmp('btn_update').enable();
                                Ext.getCmp('btn_cancel').enable();
                                Ext.getCmp('btn_masterict').enable();
                            }
					}
				});
            }
            win_register.show();
        }
        /*======================register_data==============================*/
        /*======================udpate_data===========================*/
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
							{	// ID
								xtype	: 'hiddenfield',
								id		: 'xt_id_upd',
								name	: 'xt_id_upd',
								value	: rec[0].data.id,
							},
							{ 	// TYPE OF DEVICES
								xtype				: 'combo',
								id					: 'xt_icttype_upd',
								name				: 'xt_icttype_upd',
								fieldLabel			: 'DEVICE TYPE',
								emptyText			: 'SELECT DEVICE TYPE',
								beforeLabelTextTpl	: required+' ',
								labelSeparator		: '',
								typeAhead			: true,
								editable			: true,
								allowBlank			: false,
								queryMode			: 'local',
								store				: ds_devicetype,
								displayField		: 'typename',
								valueField			: 'typeid',
								value				: ds_devicetype.findRecord('typename',rec[0].data.type).get('typeid'),
								listConfig			:{
									getInnerTpl	: function() {
										return '<div><b>{typename}</b></div>';
									}
								},
								listeners: {
									select: function(e) {
										ds_device.proxy.setExtraParam('typeid',e.value);
										ds_device.load();
									},
									change: function(field, e) {
										Ext.getCmp('xt_ict_upd').setValue('');
									},
									render: function(field, e) {
										ds_device.proxy.setExtraParam('typeid',ds_devicetype.findRecord('typename',rec[0].data.type).get('typeid'));
										ds_device.loadPage(1);
									}
								}
							},
							{ 	// DEVICES
								xtype				: 'combo',
								id					: 'xt_ict_upd',
								name				: 'xt_ict_upd',
								fieldLabel			: 'DEVICES',
								emptyText			: 'SELECT DEVICES',
								beforeLabelTextTpl	: required+' ',
								labelSeparator		: '',
								typeAhead			: true,
								editable			: true,
								allowBlank			: false,
								queryMode			: 'local',
								store				: ds_device,
								displayField		: 'name',
								valueField			: 'id',
								// value				: rec[0].data.name,
								// value				: ds_device.findRecord('name',rec[0].data.name).get('id'),
								listConfig			:{
									getInnerTpl	: function() {
										return '<div><b>{name}</b></div>';
									}
								}

							},
							{	// START DATE
								xtype	: 'container',
								flex	: 1,
								id		: 'cont-1',
								layout	: 'anchor',
								padding	: '5 0 5 0',
								items: [
									{
										xtype	: 'container',
										flex	: 1,
										id		: 'cont-2',
										layout	: 'hbox',
										padding	: '0 0 5 0',
										items: [
											{	// DATE
												xtype 				: 'datefield',
												id					: 'xt_startdate_upd',
												name				: 'xt_startdate_upd',
												fieldLabel			: 'START',
												beforeLabelTextTpl	: required+' ',
												labelSeparator		: '',
												emptyText			: 'DATE',
												minValue			: new Date(),
												format				: 'd F Y',
												submitFormat		: 'Y-m-d',
												mode				: 'local',  
												editable			: false,
												allowBlank			: false,
												width				: 250,
												value				: rec[0].data.sdate
											},
											{xtype : 'label', html : '&nbsp;-&nbsp;'},
											{	// TIME
												xtype				: 'timefield',
												id					: 'xt_starttime_upd',
												name				: 'xt_starttime_upd',
												beforeLabelTextTpl	: required+' ',
												labelSeparator		: '',
												emptyText			: 'TIME',
												minValue			: '01:00',
												maxValue			: '24:00',
												editable			: false,
												increment			: 15,
												format				: 'H:i',
												submitFormat		: 'H:i:s',
												width				: 130,
												allowBlank			: false,
												value				: rec[0].data.stime
											}
										]
									}
								]
							},
							{	// END DATE
								xtype	: 'container',
								flex	: 1,
								id		: 'cont-3',
								layout	: 'anchor',
								padding	: '5 0 5 0',
								items: [
									{
										xtype	: 'container',
										flex	: 1,
										id		: 'cont-4',
										layout	: 'hbox',
										padding	: '0 0 5 0',
										items: [
											{	// DATE
												xtype 				: 'datefield',
												id					: 'xt_enddate_upd',
												name				: 'xt_enddate_upd',
												fieldLabel			: 'END',
												beforeLabelTextTpl	: required+' ',
												labelSeparator		: '',
												emptyText			: 'DATE',
												format				: 'd F Y',
												submitFormat		: 'Y-m-d',
												mode				: 'local',  
												minValue			: new Date(),
												editable			: false,
												allowBlank			: false,
												width				: 250,
												value				: rec[0].data.edate,
												listeners			:{
													change : function(f, new_val){
														var startdate	= Date.parse(Ext.getCmp('xt_startdate').getValue(), 'Y-m-d');
														var enddate		= Date.parse(Ext.getCmp('xt_enddate').getValue(), 'Y-m-d');
														var delta 		= enddate - startdate;
														var days 		= parseInt(delta / 86400000);
														//alert(startdate +'--'+ enddate+'--'+delta+'--'+days);
														if(days == 0){
															var sttimetemp = Ext.Date.format(Ext.getCmp('xt_starttime').getValue(), 'H:i');
															var jam		   = (parseInt(sttimetemp.substring(0, 2)));
															var menit	   = sttimetemp.substring(3, 5);
															if (jam >= 24){ jam = jam-24 }else{ jam = jam; }
															if (jam <= 9){ var sttime = '0'+jam+':'+menit; }else{ var sttime = jam+':'+menit; }
															Ext.getCmp('xt_endtime').setMinValue( sttime );
															//var a = Ext.getCmp('xt_endtime').getValue();
															//alert(a);
														}
														else{
															Ext.getCmp('xt_endtime').setMinValue('04:00');
														}
													}
												}
											},
											{xtype : 'label', html : '&nbsp;-&nbsp;'},
											{	//	TIME
												xtype				: 'timefield',
												id					: 'xt_endtime_upd',
												name				: 'xt_endtime_upd',
												emptyText			: 'TIME',
												allowBlank			: false,
												editable			: false,
												increment			: 15,
												format				: 'H:i',
												minValue			: '01:00',
												maxValue			: '24:00',
												submitFormat		: 'H:i:s',
												width				: 130,
												value				: rec[0].data.etime
											}
										]
									}
								]
							},
							{	// DEPT
								xtype				: 'textfield',
								id					: 'xt_dept_upd',
								name				: 'xt_dept_upd',
								fieldLabel			: 'DEPARTMENT',
								emptyText 			: 'DEPARTMENT',
								beforeLabelTextTpl	:required+' ',
								labelSeparator		: '',
								width				: 350,
								allowBlank			: false,
								value				: rec[0].data.dept,
								listeners       	: {
									change : function(f, new_val) {
										f.setValue(new_val.toUpperCase());
									}
								}
							},
							{	// INCHARGE
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
							{	// PURPOSE
								xtype				: 'textareafield',
								id					: 'xt_purpose_upd',
								name				: 'xt_purpose_upd',
								fieldLabel			: 'PURPOSE',
								emptyText 			: 'PURPOSE',
								beforeLabelTextTpl	:required+' ',
								labelSeparator		: '',
								width				: 350,
								allowBlank			: false,
								value				: rec[0].data.purpose,
								listeners       	: {
									change : function(f, new_val) {
										f.setValue(new_val.toUpperCase());
									}
								}
							},
							{	// REMARK
								xtype				: 'textareafield',
								id					: 'xt_remark_upd',
								name				: 'xt_remark_upd',
								fieldLabel			: 'REMARK',
								emptyText 			: 'REMARK',
								beforeLabelTextTpl	: '&nbsp;&nbsp;&nbsp;',
								labelSeparator		: '',
								width				: 350,
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
								iconCls		: 'icon-save-icon8',
								formBind	: true,
								handler  	: function() {
									var form = this.up('form').getForm();
									var popwindow = this.up('window');
									if (form.isValid()) {
										form.submit({
											url             : 'resp/resp_icts.php',
											waitMsg         : 'Sending your data...',
											submitEmptyText : false,

											success : function(form, action) {
												// alert('updating success');

												Ext.getCmp('xt_icttype_upd').focus(false, 1000);
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
												// alert('updating failure');
												//console.log(form);
												// console.log(action.result.msg);

												Ext.Msg.show({
													title   : 'Oops, an error just happen ! [2]',
													id      : 'error-msg',
													icon	: Ext.Msg.ERROR,
													msg     : action.result.msg,
													buttons : Ext.Msg.OK
												});
												
												// Ext.getCmp('xt_startdate_upd').setValue("");
												// Ext.getCmp('xt_starttime_upd').setValue("");
												// Ext.getCmp('xt_enddate_upd').setValue("");
												// Ext.getCmp('xt_endtime_upd').setValue("");
												
												// Ext.getCmp('xt_starttime_upd').enable();
												// Ext.getCmp('xt_enddate_upd').disable();
												// Ext.getCmp('xt_endtime_upd').disable();
												// Ext.getCmp('xt_startdate_upd').focus();
											}
										});
									}
								}
							}
						]
					});

					win_update = Ext.widget('window', {
						title           : 'EDITING DATA',
						width			: 430,
						autoheight		: true,
						modal			: false,
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
									Ext.getCmp('btn_masterict').disable();
								},
								close:function(){
									Ext.getCmp('btn_refresh').enable();
									Ext.getCmp('btn_search').enable();
									Ext.getCmp('btn_register').enable();
									Ext.getCmp('btn_update').enable();
									Ext.getCmp('btn_cancel').enable();
									Ext.getCmp('btn_masterict').enable();
								}
						}
					});
				}
				win_update.show();
			}
        }
        /*======================update_data==============================*/
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
								html	: '<h3 style="text-align:center">Are you sure to CANCEL this RESERVATION ?</h3>'
							},
							{
								xtype	: 'hiddenfield',
								name	: 'xt_id_del',
								value	: rec[0].data.id
							},
							{
								xtype	: 'hiddenfield',
								name	: 'xt_type',
								value	: 'cancel',
							}
						],
						buttons			: [
							{
								text	: 'YES',
								// iconCls	: 'icon-cancel-icon8',
								handler	: function() {
									var form = this.up('form').getForm();
									var popwindow = this.up('window');
									if (form.isValid()) {
										form.submit({
											url		: 'resp/resp_icts.php',
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
													title		:'Failure - Delete  Data',
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
		/*====================add_devicetype==========================*/
        function add_devtype() {
            var win_adddevtype;
            if (!win_adddevtype) {
                var form_adddevtype = Ext.widget('form', {
                    layout : {
                        type  : 'vbox',
                        align : 'stretch'
					},
                    border     : false,
                    autoScroll : false,
                    bodyPadding: 10,
                    fieldDefaults :{
                        labelWidth: 150,
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
							value	: 'adddevtype'
						},
						{	// DEVICE NAME
							xtype	: 'textfield',
							id		: 'xt_devtype',
							name	: 'xt_devtype',
							fieldLabel	: 'DEVICE TYPE',
							emptyText: 'INPUT DEVICE TYPE',
							beforeLabelTextTpl:required+' ',
							labelSeparator: '',
							width: 350,
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
                                        url             : 'resp/resp_icts.php',
                                        waitMsg         : 'Sending your data...',
                                        submitEmptyText : false,

                                        success : function(form, action) {
                                            Ext.getCmp('xt_devtype').focus(false, 1000);
                                            ds_devicetype.loadPage(1);
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
                                                title   : 'Failure 4',
                                                icon	: Ext.Msg.ERROR,
                                                msg     : action.result.msg,
                                                buttons : Ext.Msg.OK
                                            });
                                        }
                                    });
                                }
                            }
                        }
                    ]
                });

                win_adddevtype = Ext.widget('window', {
                    title           : 'NEW TYPE',
                    width			 : 430,
                    autoheight		: true,
                    modal			 : true,
                    constrain       : true,
                    layout          : 'fit',
                    animateTarget   : 'btn_adddevtype',
                    items           : form_adddevtype,
					bodyStyle    	: { background :'rgba(122, 0, 61, 1); padding-bottom: 5px;'}
                 });
            }
            win_adddevtype.show();
        }
		/*====================add_devicetype==========================*/
		/*======================upd_devtype===========================*/
        function upd_devtype() {
            var rec = Ext.getCmp('griddevtype').getSelectionModel().getSelection();
			if (rec == 0){
				Ext.Msg.show({
					title	: 'Failure - Updating Data',
					icon	: Ext.Msg.INFO,
					msg		: 'Select your data for Edit',
					button	: Ext.Msg.OK
				})
			}
			else{
				var win_upddevtype;
				if (!win_upddevtype) {
					var form_upddevtype = Ext.widget('form', {
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
								value	: 'upddevtype'
							},
							{	// DEVICE ID
								xtype	: 'hiddenfield',
								id		: 'xt_iddevtype_upd',
								name	: 'xt_iddevtype_upd',
								value	: rec[0].data.typeid,
							},
							{	// DEVICE TYPE NAME
								xtype	: 'textfield',
								id		: 'xt_devtype_upd',
								name	: 'xt_devtype_upd',
								fieldLabel	: 'DEVICE TYPE',
								emptyText	: 'INPUT DEVICE TYPE',
								beforeLabelTextTpl:required+' ',
								labelSeparator: '',
								width: 350,
								value: rec[0].data.typename,
								listeners: {
									change : function(f, new_val) {
										f.setValue(new_val.toUpperCase());
									}
								}
							}
						],
						buttons : [
							{
								text    	: 'UPDATE',
								iconCls		: 'icon-save-icon8',
								formBind	: true,
								handler  	: function() {
									var form = this.up('form').getForm();
									var popwindow = this.up('window');
									if (form.isValid()) {
										form.submit({
											url             : 'resp/resp_icts.php',
											waitMsg         : 'Sending your data...',
											submitEmptyText : false,

											success : function(form, action) {
												Ext.getCmp('xt_devtype_upd').focus(false, 1000);
												ds_devicetype.loadPage(1);
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
													title   : 'Failure 5',
													icon	: Ext.Msg.ERROR,
													msg     : action.result.msg,
													buttons : Ext.Msg.OK
												});
											}
										});
									}
								}
							}
						]
					});

					win_upddevtype = Ext.widget('window', {
						title           : 'EDITING DEVICE TYPE',
						width			 : 430,
						autoheight		: true,
						modal			 : true,
						constrain       : true,
						layout          : 'fit',
						animateTarget   : 'btn_upddevtype',
						items           : form_upddevtype,
						bodyStyle    	: { background :'rgba(122, 0, 61, 1); padding-bottom: 5px;'}
					 });
				}
				win_upddevtype.show();
			}
		}
        /*======================upd_devtype==========================*/
        /*======================add_master===========================*/
        function add_master() {
            var win_addmaster;
            if (!win_addmaster) {
                var form_addmaster = Ext.widget('form', {
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
							value	: 'addmaster'
						},
						{	// DEVICE NAME
							xtype	: 'textfield',
							id		: 'xt_device',
							name	: 'xt_device',
							fieldLabel	: 'DEVICE NAME',
							beforeLabelTextTpl:required+' ',
							labelSeparator: '',
							width: 350,
							listeners       	: {
                                change : function(f, new_val) {
                                    f.setValue(new_val.toUpperCase());
                                }
                            }
						},
						{	// DEVICE TYPE
							xtype           	: 'combo',
                            id              	: 'xt_devicetype',
                            name            	: 'xt_devicetype',
                            fieldLabel      	: 'DEVICE TYPE',
                            beforeLabelTextTpl	: required+' ',
                            labelSeparator		: '',
                            queryMode       	: 'local',
                            displayField    	: 'typename',
                            valueField      	: 'typeid',
                            emptyText       	: 'DEVICE TYPE',
                            editable        	: false,
                            allowBlank      	: false,
                            store           	: ds_devicetype,
						},
						{	// DEVICE STATUS
							xtype           	: 'combo',
                            id              	: 'xt_status',
                            name            	: 'xt_status',
                            fieldLabel      	: 'DEVICE STATUS',
                            beforeLabelTextTpl	: required+' ',
                            labelSeparator		: '',
                            queryMode       	: 'local',
                            displayField    	: 'status',
                            valueField      	: 'id',
                            emptyText       	: 'SELECT STATUS',
                            editable        	: false,
                            allowBlank      	: false,
                            store           	: ds_devicestatus,
						},
						{	// REMARK
							xtype				: 'textareafield',
							id					: 'xt_masterremark',
							name				: 'xt_masterremark',
							fieldLabel			: 'REMARK',
							emptyText 			: 'REMARK',
							beforeLabelTextTpl	: '&nbsp;&nbsp;&nbsp;',
							labelSeparator		: '',
							width				: 350
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
                                        url             : 'resp/resp_icts.php',
                                        waitMsg         : 'Sending your data...',
                                        submitEmptyText : false,

                                        success : function(form, action) {
                                            Ext.getCmp('xt_device').focus(false, 1000);
                                            ds_devicemaster.loadPage(1);
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
                                                title   : 'Failure 4',
                                                icon	: Ext.Msg.ERROR,
                                                msg     : action.result.msg,
                                                buttons : Ext.Msg.OK
                                            });
                                        }
                                    });
                                }
                            }
                        }
                    ]
                });

                win_addmember = Ext.widget('window', {
                    title           : 'NEW MASTER',
                    width			 : 430,
                    autoheight		: true,
                    modal			 : true,
                    constrain       : true,
                    layout          : 'fit',
                    animateTarget   : 'btn_addmaster',
                    items           : form_addmaster,
					bodyStyle    	: { background :'rgba(122, 0, 61, 1); padding-bottom: 5px;'},
                    listeners       : {
                            activate:function(){
                                Ext.getCmp('btn_addmaster').disable();
                                Ext.getCmp('btn_updmaster').disable();
                            },
                            close:function(){
                                Ext.getCmp('btn_addmaster').enable();
                                Ext.getCmp('btn_updmaster').enable();
                            }
                     }
                 });
            }
            win_addmember.show();
        }
        /*======================add_master===========================*/
        /*======================upd_master===========================*/
        function upd_master() {
            var rec = Ext.getCmp('gridmasterict').getSelectionModel().getSelection();
			if (rec == 0){
				Ext.Msg.show({
					title	: 'Failure - Updating Data',
					icon	: Ext.Msg.INFO,
					msg		: 'Select your data for Edit',
					button	: Ext.Msg.OK
				})
			}
			else{
				var win_updmaster;
				if (!win_updmaster) {
					var form_updmaster = Ext.widget('form', {
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
								value	: 'updmaster'
							},
							{
								xtype	: 'hiddenfield',
								id		: 'xt_idict_upd',
								name	: 'xt_idict_upd',
								value	: rec[0].data.id,
							},
							{	// DEVICE NAME
								xtype				: 'textfield',
								id					: 'xt_device_upd',
								name				: 'xt_device_upd',
								fieldLabel			: 'DEVICE NAME',
								emptyText			: 'INPUT DEVICE NAME',
								beforeLabelTextTpl	:required+' ',
								labelSeparator		: '',
								width				: 350,
								value				: rec[0].data.name,
								listeners       	: {
									change : function(f, new_val) {
										f.setValue(new_val.toUpperCase());
									}
								}
							},
							{	// DEVICE TYPE
								xtype           	: 'combo',
								id              	: 'xt_devicetype_upd',
								name            	: 'xt_devicetype_upd',
								fieldLabel      	: 'DEVICE TYPE',
								beforeLabelTextTpl	: required+' ',
								labelSeparator		: '',
								queryMode       	: 'local',
								displayField    	: 'typename',
								valueField      	: 'typeid',
								emptyText       	: 'DEVICE TYPE',
								editable        	: false,
								allowBlank      	: false,
								store           	: ds_devicetype,
								// value				: rec[0].data.type,
								value				: ds_devicetype.findRecord('typename',rec[0].data.type).get('typeid')
							},
							{	// DEVICE STATUS
								xtype           	: 'combo',
								id              	: 'xt_status_upd',
								name            	: 'xt_status_upd',
								fieldLabel      	: 'DEVICE STATUS',
								beforeLabelTextTpl	: required+' ',
								labelSeparator		: '',
								queryMode       	: 'local',
								displayField    	: 'status',
								valueField      	: 'id',
								emptyText       	: 'SELECT STATUS',
								editable        	: false,
								allowBlank      	: false,
								store           	: ds_devicestatus,
								// value				: rec[0].data.status,
								value				: ds_devicestatus.findRecord('status',rec[0].data.status).get('id')
							},
							{	// REMARK
								xtype				: 'textareafield',
								id					: 'xt_masterremark_upd',
								name				: 'xt_masterremark_upd',
								fieldLabel			: 'REMARK',
								emptyText 			: 'REMARK',
								beforeLabelTextTpl	: '&nbsp;&nbsp;&nbsp;',
								labelSeparator		: '',
								width				: 350,
								value				: rec[0].data.remark
							}
						],
						buttons : [
							{
								text    	: 'UPDATE',
								iconCls		: 'icon-save-icon8',
								formBind	: true,
								handler  	: function() {
									var form = this.up('form').getForm();
									var popwindow = this.up('window');
									if (form.isValid()) {
										form.submit({
											url             : 'resp/resp_icts.php',
											waitMsg         : 'Sending your data...',
											submitEmptyText : false,

											success : function(form, action) {
												Ext.getCmp('xt_device_upd').focus(false, 1000);
												ds_devicemaster.loadPage(1);
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
													title   : 'Failure 5',
													icon	: Ext.Msg.ERROR,
													msg     : action.result.msg,
													buttons : Ext.Msg.OK
												});
											}
										});
									}
								}
							}
						]
					});

					win_updmaster = Ext.widget('window', {
						title           : 'EDITING MASTER',
						width			 : 430,
						autoheight		: true,
						modal			 : true,
						constrain       : true,
						layout          : 'fit',
						animateTarget   : 'btn_updmaster',
						items           : form_updmaster,
						bodyStyle    	: { background :'rgba(122, 0, 61, 1); padding-bottom: 5px;'},
						listeners       : {
								activate:function(){
									Ext.getCmp('btn_addmaster').disable();
									Ext.getCmp('btn_updmaster').disable();
								},
								close:function(){
									Ext.getCmp('btn_addmaster').enable();
									Ext.getCmp('btn_updmaster').enable();
								}
						 }
					 });
				}
				win_updmaster.show();
			}
		}
        /*======================upd_master==========================*/
        /*====================master_devicetype=====================*/
        function add_mastertype (widget, event){
			var win_mastertype;
			if (!win_mastertype) {
				var form_mastertype = Ext.widget('form',{
					layout			: {
						type	: 'vbox',
						align	: 'stretch'
					},
					border			: false,
					bodypadding		: 10,
					fieldDefaults	: {
										labelWidth	: 80,
										labelStyle	: 'font-weight:bold',
										msgTarget	: 'side',
									},

					defaults		: {
										magins		: '0 0 10 0'
									},
					tbar: [
						'->',
						{
							xtype  : 'button',
							id     : 'btn_adddevtype',
							text   : 'Add Device Type',
							iconCls: 'icon-plus-icon8',
							tooltip: 'Create New Type',
							scale  : 'medium',
							handler : add_devtype
						},
						{
							xtype  : 'button',
							id     : 'btn_upddevtype',
							text   : 'Edit Device Type',
							iconCls: 'icon-edit-icon8',
							tooltip: 'Editing selected Device Type',
							scale  : 'medium',
							handler : upd_devtype
						}
					],
					items: [
						{
							xtype		: 'grid',
							id			: 'griddevtype',
							store		: ds_devicetype,
							height		: 400,
							autoScroll	: true,
							columns		: [
								{header: 'NO', xtype: 'rownumberer', width: 50, height: 40, sortable: false },
								{ text: 'ID',			dataIndex: 'typeid',		flex: 1, tdCls:'wrap-text', align:'left', hidden: true },
								{ text: 'DEVICE TYPE',	dataIndex: 'typename',		flex: 1, tdCls:'wrap-text', align:'left' }
							]
						}
					],
				});
				win_mastertype = Ext.widget('window',{
					title			: 'DEVICE TYPE',
					width			: 670,
					heigth			: 400,
					modal			: true,
					constrain		: true,
					layout			: 'fit',
					animateTarget	: 'btn_addmastertype',
					items			: form_mastertype
				});
			}
			win_mastertype.show();
        }
        /*====================master_devicetype=====================*/
		
		/*======================master_device=======================*/
        function masterict (widget, event){
            // ds_devicemaster.loadPage(1);
			var win_masterict;
			if (!win_masterict) {
				var form_masterict = Ext.widget('form',{
					layout			: {
									type	: 'vbox',
									align	: 'stretch'
									},
					border			: false,
					bodypadding		: 10,
					fieldDefaults	: {
										labelWidth	: 80,
										labelStyle	: 'font-weight:bold',
										msgTarget	: 'side',
									},

					defaults		: {
										magins		: '0 0 10 0'
									},
					tbar: [
						{
							xtype  : 'button',
							id     : 'btn_mrefresh',
							text   : 'Refresh',
							tooltip: 'Refresh Data Master',
							iconCls: 'icon-refresh-icon8',
							scale  : 'medium',
							handler: function() {
								ds_devicemaster.proxy.setExtraParam('src_mdevname', '' );
								ds_devicemaster.proxy.setExtraParam('src_mdevtype', '' );
								Ext.getCmp('src_mdevname').reset();
								Ext.getCmp('src_mdevtype').reset();
								ds_devicemaster.loadPage(1);
							}
						},
						'->',
						{	// BUTTON ADD MASTER TYPE / CATEGORY OF DEVICES
							xtype  : 'button',
							id     : 'btn_addmastertype',
							text   : 'Add Device Type',
							iconCls: 'icon-plus-icon8',
							tooltip: 'Create New Type',
							scale  : 'medium',
							handler : add_mastertype
						},
						{	// BUTTON  ADD MASTER DEVEICES
							xtype  : 'button',
							id     : 'btn_addmaster',
							text   : 'Add Master',
							iconCls: 'icon-plus-icon8',
							tooltip: 'Create New Master',
							scale  : 'medium',
							handler : add_master
						},
						{	// BUTTON DEVICES
							xtype  : 'button',
							id     : 'btn_updmaster',
							text   : 'Edit Master',
							iconCls: 'icon-edit-icon8',
							tooltip: 'Editing selected Master',
							scale  : 'medium',
							handler : upd_master
						}
					],
					items: [
						{
							xtype		: 'grid',
							id			: 'gridmasterict',
							store		: ds_devicemaster,
							height		: 400,
							autoScroll	: true,
							features: [{
								id: 'group',
								ftype: 'groupingsummary',
								groupHeaderTpl: '{name}',
								hideGroupedHeader: false,
								enableGroupingMenu: true
							}, {
								ftype: 'summary',
								dock: 'bottom'
							}],
							columns		: [
								{header: 'NO', xtype: 'rownumberer', width: 50, height: 40, sortable: false },
								{ text: 'ID',			dataIndex: 'id',		flex: 1, tdCls:'wrap-text', align:'left', hidden: true },
								{ text: 'DEVICE NAME',	dataIndex: 'name', 		flex: 1, tdCls:'wrap-text', align:'left', layout: {type:'vbox',align:'stretch',pack:'top'},
									items:[{
										xtype: 'textfield', id: 'src_mdevname', name: 'src_mdevname',  emptyText: 'SEARCH DEVICE NAME',
										listeners: {
											specialkey: function(field, e) {
												if (e.getKey() == e.ENTER) {
													ds_devicemaster.proxy.setExtraParam('src_mdevname',field.getValue());
													ds_devicemaster.proxy.setExtraParam('src_mdevtype',Ext.getCmp('src_mdevtype').getRawValue());
													ds_devicemaster.loadPage(1);
												}
											}
										}
									}],
									summaryType: 'count',
									summaryRenderer: function(value, summaryData, dataIndex) {
										return ((value === 0 || value > 1) ? 'TOTAL : (' + value + ' Devices)' : '(1 Device)');
									},
								},
								{ text: 'DEVICE TYPE',	dataIndex: 'type',		flex: 1, tdCls:'wrap-text', align:'left', layout: {type:'vbox',align:'stretch',pack:'top'},
									items:[{
										xtype: 'combo', id: 'src_mdevtype', name: 'src_mdevtype',  emptyText: 'SEARCH DEVICE TYPE', store: ds_devicetype, displayField: 'typename' ,valueField: 'typeid', editable: false,
										listeners: {
											select: function(e) {
												ds_devicemaster.proxy.setExtraParam('src_mdevname',Ext.getCmp('src_mdevname').getValue());
												ds_devicemaster.proxy.setExtraParam('src_mdevtype',e.getValue());
												ds_devicemaster.loadPage(1);
											}
										}
									}]
								},
								{ text: 'STATUS',		dataIndex: 'status',	flex: 1, tdCls:'wrap-text', align:'left' },
								{ text: 'REMARK',		dataIndex: 'remark',	flex: 1, tdCls:'wrap-text', align:'left' },
							]
						}
					],
				});
				win_masterict = Ext.widget('window',{
					title			: 'DEVICE MASTER',
					width			: 670,
					heigth			: 400,
					modal			: true,
					constrain		: true,
					layout			: 'fit',
					animateTarget	: 'btn_masterict',
					items			: form_masterict
				});
			}
			win_masterict.show();
        }
        /*=======================master_device========================*/
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
                        {	// SEARCH DEVICE TYPE 
                            xtype				: 'combo',
                            id					: 'xt_icttype_src',
                            name				: 'xt_icttype_src',
                            fieldLabel			: 'DEVICE TYPE',
                            emptyText			: 'SELECT DEVICE TYPE',
                            labelSeparator		: '',
                            typeAhead			: true,
                            editable			: true,
                            queryMode			: 'local',
                            store				: ds_devicetype,
                            displayField		: 'typename',
                            valueField			: 'typeid',
                            listConfig			:{
                                getInnerTpl	: function() {
                                    return '<div><b>{typename}</b></div>';
                                }
							},
							listeners: {
								select: function(e) {
									ds_device.proxy.setExtraParam('typeid',e.getValue());
									ds_device.loadPage();
								},
								change: function() {
									Ext.getCmp('xt_ictname_src').reset();
								}
							}
						},
						{	// SEARCH DEVICE NAME
                            xtype				: 'combo',
                            id					: 'xt_ictname_src',
                            name				: 'xt_ictname_src',
                            fieldLabel			: 'DEVICE NAME',
                            emptyText			: 'SELECT DEVICE NAME',
                            labelSeparator		: '',
                            typeAhead			: true,
                            editable			: true,
                            queryMode			: 'local',
                            store				: ds_device,
                            displayField		: 'name',
                            valueField			: 'id',
                            listConfig			:{
                                getInnerTpl	: function() {
                                    return '<div><b>{name}</b></div>';
                                }
                            },
                        },
						{	// SEARCH DATE
							xtype 				: 'datefield',
							id					: 'xt_date_src',
							name				: 'xt_date_src',
							fieldLabel			: 'DATE',
							labelSeparator		: '',
							emptyText			: 'DATE',
							format				: 'd F Y',
                            submitFormat		: 'Y-m-d',
                            mode				: 'local',  
                            editable			: false,
                            width				: 250,
						},
						{	// SEARCH INCHARGE
							xtype				: 'textfield',
							id					: 'xt_incharge_src',
							name				: 'xt_incharge_src',
							fieldLabel			: 'INCHARGE',
							emptyText 			: 'INCHARGE / USERNAME',
							labelSeparator		: '',
							width				: 350,
							listeners       	: {
                                change : function(f, new_val) {
                                    f.setValue(new_val.toUpperCase());
                                }
                            }
						}
					],
                    buttons			: [
                        {
                            text		: 'Reset',
                            iconCls		: 'icon-reset-icon8',
                            handler		: function(){
                                this.up('form').getForm().reset();
                                ds_view.proxy.setExtraParam('src_ict', '' );
                            	ds_view.proxy.setExtraParam('src_date', '' );
                            	ds_view.proxy.setExtraParam('src_incharge', '' );
                            	ds_view.loadPage(1);
                            }
                        },
                        {
                            text		: 'Search',
                            iconCls		: 'icon-searchs-icon8',
                            handler		: function(){
								var form = this.up('form').getForm();
                                var popwindow = this.up('window');
                                if (form.isValid()) {
									ds_view.proxy.setExtraParam('src_ict', Ext.getCmp('xt_ict_src').getValue() );
									ds_view.proxy.setExtraParam('src_date', Ext.getCmp('xt_date_src').getValue() );
									ds_view.proxy.setExtraParam('src_incharge', Ext.getCmp('xt_incharge_src').getValue() );
									ds_view.loadPage(1); 
									popwindow.close();
                                }
								
                            }
                        }
                    ]
                });
                win_search = Ext.widget('window',{
                    title			: 'Search by field',
                    minWidth		: 400,
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
                            Ext.getCmp('btn_masterict').disable();
                        	
                        },
                        close:function(){
                            Ext.getCmp('btn_refresh').enable();
                            Ext.getCmp('btn_search').enable();
                            Ext.getCmp('btn_register').enable();
                            Ext.getCmp('btn_update').enable();
                        	Ext.getCmp('btn_cancel').enable();
                            Ext.getCmp('btn_masterict').enable();
                       	
                        }
                    }
                });
            }
            win_search.show();
        }
        /*======================search data===========================*/
    //==========================FUNCTION==============================================================================
    //==========================VARIABLE==============================================================================
         var grouping = Ext.create('Ext.grid.feature.Grouping',{
			groupHeaderTpl: 'Leave Date : {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
		});
    //==========================VARIABLE==============================================================================
    //==========================GRID==================================================================================
        var grid = Ext.create('Ext.grid.Panel',{
            renderTo	: 'ict',
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
            features	: [grouping,{ftype: 'summary'}],
            tbar		:[
				{	// REFRESH
					xtype  : 'button',
					id     : 'btn_refresh',
					text   : 'Refresh',
					tooltip: 'Refresh',
					iconCls: 'icon-refresh-icon8',
					scale  : 'medium',
					handler: function() {
						ds_view.proxy.setExtraParam('src_ict', '' );
						ds_view.proxy.setExtraParam('src_date', '' );
						ds_view.proxy.setExtraParam('src_incharge', '' );
						ds_view.loadPage(1);
					}
				},
				{	// SEARCH
					xtype  : 'button',
					id     : 'btn_search',
					text   : 'Search',
					iconCls: 'icon-searchs-icon8',
					scale  : 'medium',
					tooltip: 'Search',
					handler: search_data
				},
				{	// REGISTER
					xtype  : 'button',
					id     : 'btn_register',
					text   : 'Register',
					iconCls: 'icon-register-icon8',
					scale  : 'medium',
					tooltip: 'Register your reservation',
					handler: register_data
				},
				{	// UPDATE
					xtype  : 'button',
					id     : 'btn_update',
					text   : 'Edit Transaction',
					iconCls: 'icon-edit-icon8',
					tooltip: 'Editing your selection reservation',
					scale  : 'medium',
					handler : update_data
				},
				{	// CANCEL
					xtype  : 'button',
					id     : 'btn_cancel',
					text   : 'Cancel Transaction',
					iconCls: 'icon-cancel-icon8',
					tooltip: 'Cancel your reservation',
					scale  : 'medium',
					handler : cancel_data
				},
				'->',
				{	// MASTER
					xtype  : 'button',
					id     : 'btn_masterict',
					text   : 'Device Masters',
					iconCls: 'icon-master-icon8',
					scale  : 'medium',
					tooltip: 'Master data',
					handler: masterict
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
				{ header: 'NO', xtype: 'rownumberer', width: 40, height: 40, sortable: false },
				{ header: 'TRANSACT ID',	dataIndex: 'id',	flex:1, 	tdCls:'wrap-text',  align:'center', hidden:true},
				{ header: 'DEVICE TYPE',	dataIndex: 'type',	flex:1, 	tdCls:'wrap-text',  align:'left'},
				{ header: 'DEVICE NAME',	dataIndex: 'name',	flex:1, 	tdCls:'wrap-text',  align:'center'},
				{ header: 'INCHARGE', 		dataIndex: 'incharge',	flex:1,  	tdCls:'wrap-text',  align:'left'},
				{ header: 'DEPARTMENT', 	dataIndex: 'dept',	flex:1, 	tdCls:'wrap-text',  align:'left'},
				{ header: 'START DATE', 	dataIndex: 'sdate',	flex:1, 	tdCls:'wrap-text',  align:'center', renderer: Ext.util.Format.dateRenderer('d F Y')},
				{ header: 'START TIME', 	dataIndex: 'stime',	flex:1, 	tdCls:'wrap-text',  align:'center'},
				{ header: 'END DATE', 		dataIndex: 'edate',	flex:1, 	tdCls:'wrap-text',  align:'center', renderer: Ext.util.Format.dateRenderer('d F Y')},
				{ header: 'END TIME', 		dataIndex: 'etime',	flex:1, 	tdCls:'wrap-text',  align:'center'},
				{ header: 'PURPOSE',  		dataIndex: 'purpose',	flex:1, 	tdCls:'wrap-text',  align:'left'},
				{ header: 'REMARK',  		dataIndex: 'remark',	flex:1, 	tdCls:'wrap-text',  align:'left'},
				{ header: 'USER INPUT',		dataIndex: 'input_nik',	flex:1, 	tdCls:'wrap-text',  align:'left', hidden:true},
				{ header: 'DATE INPUT',		dataIndex: 'input_date',	flex:1, 	tdCls:'wrap-text',  align:'left', renderer: Ext.util.Format.dateRenderer('d F Y H:i'), hidden:true},
            ],
            listeners: {
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
