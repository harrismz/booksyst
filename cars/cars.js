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
    
	/*=========ds_carstatus==========*/
        Ext.define('M_carstatus',{
            extend: 'Ext.data.Model',
            fields: ['id_status','carstatus']
        });
    
        var db_carstatus = [
            ['1','OPERATIONAL'],
            ['2','NON OPERATIONAL']
        ];
    
        var ds_carstatus = Ext.create('Ext.data.ArrayStore',{
            model   : 'M_carstatus',
            data : db_carstatus
        });
	/*=========ds_carstatus==========*/ 
	
	//==========================DS NO DB===========================================================================
    //==========================DS STORE===========================================================================
        /*=========ds_view==========*/
        Ext.define('M_view',{
            extend: 'Ext.data.Model',
            fields: ['id_rentcar','platno','dept_car','driver','driver_call','dept','incharge','start_date','start_time','end_date','end_time','destination','purpose','remark']
        });
        var ds_view = Ext.create('Ext.data.Store',{
            model	: 'M_view',
            autoLoad: true,
            proxy	: {
                type	: 'ajax',
                api     : {
                    read    : 'json/json_viewcars.php',
                },
                reader	: {
                    type    : 'json',
                    root	: 'data'
                }
            }
        });
        /*=========ds_view==========*/
		/*=========ds_cardata==========*/
        Ext.define('M_cardata',{
            extend: 'Ext.data.Model',
            fields: ['id_car','platno','dept','driver','status']
        });
        var ds_cardata = Ext.create('Ext.data.Store',{
            model	: 'M_cardata',
            autoLoad: true,
            proxy	: {
                type	: 'ajax',
                api     : {
                    read    : 'json/json_cardata.php',
                },
                reader	: {
                    type    : 'json',
                    root	: 'data'
                }
            }
        });
        /*=========ds_cardata==========*/
        /*=========ds_detail==========*/
        Ext.define('M_detail',{
            extend: 'Ext.data.Model',
            fields: ['dept_member','username']
        });
        var ds_detail = Ext.create('Ext.data.Store',{
            model	: 'M_detail',
            autoLoad: true,
            proxy	: {
                type	: 'ajax',
                api     : {
                    read    : 'json/json_cardetail.php',
                },
                reader	: {
                    type    : 'json',
                    root	: 'data'
                }
            }
        });
        /*=========ds_roomdata==========*/
        /*=========ds_mastercar==========*/
        Ext.define('M_mastercar',{
            extend: 'Ext.data.Model',
            fields: ['id_car','platno','dept','driver','driver_call','carname','status']
        });
        var ds_mastercar = Ext.create('Ext.data.Store',{
            model	: 'M_mastercar',
            autoLoad: true,
            proxy	: {
                type	: 'ajax',
                api     : {
                    read    : 'json/json_carmaster.php',
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
						{
                            xtype				: 'combo',
                            id					: 'xt_car',
                            name				: 'xt_car',
                            fieldLabel			: 'TRANSPORT',
                            emptyText			: 'SELECT TRANSPORTATION',
                            beforeLabelTextTpl	: required+' ',
                            labelSeparator		: '',
                            typeAhead			: true,
                            editable			: true,
                            allowBlank			: false,
							queryMode			: 'local',
                            store				: ds_cardata,
                            displayField		: 'platno',
                            valueField			: 'id_car',
                            listConfig			:{
                                getInnerTpl	: function() {
                                    return '<div><b>{platno}</b> - ( {status} )</div>';
                                }
                            },
                        },
                        {
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
						{
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
						{
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
							xtype				: 'textfield',
							id					: 'xt_dest',
							name				: 'xt_dest',
							fieldLabel			: 'DESTINATION',
							emptyText 			: 'DESTINATION',
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
						{
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
                                        url             : 'resp/resp_cars.php',
                                        waitMsg         : 'Sending your data...',
                                        submitEmptyText : false,

                                        success : function(form, action) {
                                            Ext.getCmp('xt_car').focus(false, 1000);
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
                                Ext.getCmp('btn_detail').disable();
                                Ext.getCmp('btn_mastercar').disable();
                            },
                            close:function(){
                                Ext.getCmp('btn_refresh').enable();
                                Ext.getCmp('btn_search').enable();
                                Ext.getCmp('btn_register').enable();
                                Ext.getCmp('btn_update').enable();
                                Ext.getCmp('btn_cancel').enable();
                                Ext.getCmp('btn_detail').enable();
                                Ext.getCmp('btn_mastercar').enable();
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
							{
								xtype	: 'hiddenfield',
								id		: 'xt_idrentcar_upd',
								name	: 'xt_idrentcar_upd',
								value	: rec[0].data.id_rentcar,
							},
							{
								xtype				: 'combo',
								id					: 'xt_car_upd',
								name				: 'xt_car_upd',
								fieldLabel			: 'TRANSPORT',
								emptyText			: 'SELECT TRANSPORTATION',
								beforeLabelTextTpl	: required+' ',
								labelSeparator		: '',
								typeAhead			: true,
								editable			: false,
								allowBlank			: false,
								queryMode			: 'local',
								store				: ds_cardata,
								displayField		: 'platno',
								valueField			: 'platno',
								value				: rec[0].data.platno,
								listConfig			:{
									getInnerTpl	: function() {
										return '<div><b>{platno}</b> - ( {status} )</div>';
									}
								},
							},
							{
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
												value				: rec[0].data.start_date,
												listeners			: {
													select : function(){
														Ext.getCmp('xt_starttime_upd').setValue("");
														Ext.getCmp('xt_enddate_upd').setValue("");
														Ext.getCmp('xt_endtime_upd').setValue("");
														
														Ext.getCmp('xt_starttime_upd').enable();
														Ext.getCmp('xt_enddate_upd').disable();
														Ext.getCmp('xt_endtime_upd').disable();
													}
												}
											},
											{xtype : 'label', html : '&nbsp;-&nbsp;'},
											{
												xtype				: 'timefield',
												id					: 'xt_starttime_upd',
												name				: 'xt_starttime_upd',
												beforeLabelTextTpl	: required+' ',
												labelSeparator		: '',
												emptyText			: 'TIME',
												minValue			: '04:00',
												maxValue			: '24:00',
												editable			: false,
												increment			: 15,
												format				: 'H:i',
												submitFormat		: 'H:i:s',
												width				: 130,
												allowBlank			: false,
												//disabled			: true,
												value				: rec[0].data.start_time,
												listeners			: {
													select : function(){
														Ext.getCmp('xt_enddate_upd').setValue("");
														Ext.getCmp('xt_endtime_upd').setValue("");
														
														Ext.getCmp('xt_enddate_upd').enable();
														Ext.getCmp('xt_endtime_upd').disable();
													}
												}
											}
										]
									}
								]
							},
							{
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
												//disabled			: true,
												width				: 250,
												value				: rec[0].data.end_date,
												listeners			:{
													select : function(){
														Ext.getCmp('xt_endtime_upd').setValue("");
														Ext.getCmp('xt_endtime_upd').enable();
													},
													change : function(f, new_val){
														var startdate	= Date.parse(Ext.getCmp('xt_startdate_upd').getValue(), 'Y-m-d');
														var enddate		= Date.parse(Ext.getCmp('xt_enddate_upd').getValue(), 'Y-m-d');
														var delta 		= enddate - startdate;
														var days 		= parseInt(delta / 86400000);
														//alert(startdate +'--'+ enddate+'--'+delta+'--'+days);
														if(days == 0){
															var sttimetemp = Ext.Date.format(Ext.getCmp('xt_starttime_upd').getValue(), 'H:i');
															var jam		   = (parseInt(sttimetemp.substring(0, 2)));
															var menit	   = sttimetemp.substring(3, 5);
															if (jam >= 24){ jam = jam-24 }else{ jam = jam; }
															if (jam <= 9){ var sttime = '0'+jam+':'+menit; }else{ var sttime = jam+':'+menit; }
															Ext.getCmp('xt_endtime_upd').setMinValue( sttime );
															//var a = Ext.getCmp('xt_endtime').getValue();
															//alert(a);
														}
														else{
															Ext.getCmp('xt_endtime_upd').setMinValue('04:00');
														}
													}
												}
											},
											{xtype : 'label', html : '&nbsp;-&nbsp;'},
											{
												xtype				: 'timefield',
												id					: 'xt_endtime_upd',
												name				: 'xt_endtime_upd',
												emptyText			: 'TIME',
												allowBlank			: false,
												//disabled			: true,
												editable			: false,
												increment			: 15,
												format				: 'H:i',
												minValue			: '04:00',
												maxValue			: '24:00',
												submitFormat		: 'H:i:s',
												width				: 130,
												value				: rec[0].data.end_time,
							
											}
										]
									}
								]
							},
							{
								xtype				: 'textfield',
								id					: 'xt_dest_upd',
								name				: 'xt_dest_upd',
								fieldLabel			: 'DESTINATION',
								emptyText 			: 'DESTINATION',
								beforeLabelTextTpl	:required+' ',
								labelSeparator		: '',
								width				: 350,
								allowBlank			: false,
								value				: rec[0].data.destination,
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
							{
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
							{
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
							/*{
								text    : 'Reset',
								iconCls	: 'icon-reset-icon8',
								handler : function() {
									this.up('form').getForm().reset();
								}
							},*/
							{
								text    	: 'UPDATE',
								iconCls		: 'icon-save-icon8',
								formBind	: true,
								handler  	: function() {
									var form = this.up('form').getForm();
									var popwindow = this.up('window');
									if (form.isValid()) {
										form.submit({
											url             : 'resp/resp_cars.php',
											waitMsg         : 'Sending your data...',
											submitEmptyText : false,

											success : function(form, action) {
												Ext.getCmp('xt_car_upd').focus(false, 1000);
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
													title   : 'Failure 2',
													icon	: Ext.Msg.ERROR,
													msg     : action.result.msg,
													buttons : Ext.Msg.OK
												});
												
												Ext.getCmp('xt_startdate_upd').setValue("");
												Ext.getCmp('xt_starttime_upd').setValue("");
												Ext.getCmp('xt_enddate_upd').setValue("");
												Ext.getCmp('xt_endtime_upd').setValue("");
												
												Ext.getCmp('xt_starttime_upd').enable();
												Ext.getCmp('xt_enddate_upd').disable();
												Ext.getCmp('xt_endtime_upd').disable();
												Ext.getCmp('xt_startdate_upd').focus();
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
									Ext.getCmp('btn_detail').disable();
									Ext.getCmp('btn_mastercar').disable();
								},
								close:function(){
									Ext.getCmp('btn_refresh').enable();
									Ext.getCmp('btn_search').enable();
									Ext.getCmp('btn_register').enable();
									Ext.getCmp('btn_update').enable();
									Ext.getCmp('btn_cancel').enable();
									Ext.getCmp('btn_detail').enable();
									Ext.getCmp('btn_mastercar').enable();
								}
						}
					});
				}
				win_update.show();
			}
        }
        /*======================update_data==============================*/
        /*======================add_member===========================*/
        function add_member() {
            var win_addmember;
            if (!win_addmember) {
                var form_addmember = Ext.widget('form', {
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
							value	: 'addmember'
							
						},
						{
							xtype	: 'hiddenfield',
							name	: 'xt_idrentcardet',
							value	: Ext.getCmp('xt_idrentcardetail').getValue()
							
						},
						{
							xtype	: 'textfield',
							id		: 'xt_deptmember',
							name	: 'xt_deptmember',
							fieldLabel	: 'DEPARTMENT',
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
							xtype	: 'textfield',
							id		: 'xt_addmember',
							name	: 'xt_addmember',
							fieldLabel	: 'NEW FOLLOWER',
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
                                        url             : 'resp/resp_cars.php',
                                        waitMsg         : 'Sending your data...',
                                        submitEmptyText : false,

                                        success : function(form, action) {
                                            Ext.getCmp('xt_deptmember').focus(false, 1000);
                                            ds_detail.loadPage(1);
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
                                                title   : 'Failure 3',
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
                    title           : 'NEW FOLLOWER',
                    width			 : 430,
                    autoheight		: true,
                    modal			 : false,
                    constrain       : true,
                    layout          : 'fit',
                    animateTarget   : 'btn_addmember',
                    items           : form_addmember,
					bodyStyle    	: { background :'rgba(122, 0, 61, 1); padding-bottom: 5px;'},
                    listeners       : {
                            activate:function(){
                                Ext.getCmp('btn_addmember').disable();
                                Ext.getCmp('btn_delmember').disable();
                            },
                            close:function(){
                                Ext.getCmp('btn_addmember').enable();
                                Ext.getCmp('btn_delmember').enable();
                            }
                     }
                 });
            }
            win_addmember.show();
        }
        /*======================add_member==============================*/
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
									name	: 'xt_idrentcar',
									value	: rec[0].data.id_rentcar
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
                                                url		: 'resp/resp_cars.php',
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
		/*======================del_member===========================*/
           function del_member(widget, event) {
                var rec = Ext.getCmp("gridmember").getSelectionModel().getSelection();
                var recLength = rec.length;
                if(recLength == ""){
                    Ext.Msg.show({
                        title   : 'Warning',
                        icon    : Ext.Msg.ERROR,
                        msg     : "No data selected.",
                        button  : Ext.Msg.OK  
                    });
                }
                else{
                    var win_delmember;
                    if (!win_delmember) {
                        var form_delmember = Ext.widget('form', {
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
									xtype	: 'hiddenfield',
									name	: 'xt_type',
									value	: 'delmember'
								},
								{
									xtype	: 'hiddenfield',
									name	: 'xt_idrentcardet_del',
									value	: Ext.getCmp('xt_idrentcardetail').getValue()
								},
								{
									xtype	: 'hiddenfield',
									name	: 'xt_username',
									value	: rec[0].data.username
								},
								{
                                    xtype	: 'label',
                                    html	: 'Are you sure to DELETE this member ??'
                                }
                            ],
                            buttons			: [
                                {
                                    text	: 'DELETE',
                                    iconCls	: 'icon-cancel-icon8',
                                    handler	: function() {
                                        var form = this.up('form').getForm();
                                        var popwindow = this.up('window');
                                        if (form.isValid()) {
                                            form.submit({
                                                url		: 'resp/resp_cars.php',
                                                waitMsg	: 'sending data',

                                                success	: function(form, action) {
                                                    popwindow.close();
                                                    ds_detail.loadPage();

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

                        win_delmember = Ext.widget('window', {
                            title			: 'Delete Member',
							bodyStyle    	: { background :'rgba(122, 0, 61, 1); padding-bottom: 5px;'},
                            minWidth		: 380,
                            autoHeight		: true,
                            modal			: true,
                            constrain		: true,
                            layout			: 'fit',
                            animateTarget	: 'btn_delmember',
                            items			: form_delmember
                        });
                    }
                    win_delmember.show();
                }
            }
        /*======================del_member===========================*/
		/*======================view_detail========================*/
        function view_detail (widget, event){
            var rec = grid.getSelectionModel().getSelection();
			var recLength = rec.length;
			if(recLength == ""){
				Ext.Msg.show({
					title   : 'Warning',
					icon    : Ext.Msg.ERROR,
					msg     : "No data selected.",
					button  : Ext.Msg.OK  
				});
			}
			else{
				var id_rentcar = rec[0].data.id_rentcar;
				ds_detail.proxy.setExtraParam('id_rentcar', id_rentcar );
				ds_detail.loadPage(1);
				var win_detail;
				if (!win_detail) {
					var form_detail = Ext.widget('form',{
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
								xtype	: 'hiddenfield',
								id		: 'xt_idrentcardetail',
								name	: 'xt_idrentcardetail',
								readOnly: true,
								value	: id_rentcar
							},
							'->',
							{
								xtype  : 'button',
								id     : 'btn_addmember',
								text   : 'Add Follower',
								iconCls: 'icon-plus-icon8',
								tooltip: 'Add Follower',
								scale  : 'medium',
								handler : add_member
							},
							{	
								xtype  : 'button',
								id     : 'btn_delmember',
								text   : 'Delete Follower',
								iconCls: 'icon-minus-icon8',
								tooltip: 'Delete Follower Selection',
								scale  : 'medium',
								handler : del_member
							},
						],
						items: [
							{
								xtype		: 'grid',
								id			: 'gridmember',
								store		: ds_detail,
								height		: 250,
								autoScroll	: true,
								columns		: [
									{header: 'NO', xtype: 'rownumberer', width: 50, height: 40, sortable: false },
									{ text: 'DEPARTMENT', dataIndex: 'dept_member', flex: 1, tdCls:'wrap-text', align:'left' },
									{ text: 'FOLLOWERS', dataIndex: 'username', flex: 1, tdCls:'wrap-text', align:'left' },
								]
							}
						],
					});
					win_detail = Ext.widget('window',{
						title			: 'DETAIL FOLLOWERS IN RESERVATION TRANSPORT',
						width			: 400,
						heigth			: 400,
						modal			: true,
						constrain		: true,
						layout			: 'fit',
						animateTarget	: 'btn_detail',
						items			: form_detail,
						listeners		: {
							activate:function(){
								Ext.getCmp('btn_refresh').disable();
								Ext.getCmp('btn_search').disable();
								Ext.getCmp('btn_register').disable();
								Ext.getCmp('btn_update').disable();
								Ext.getCmp('btn_cancel').disable();
								Ext.getCmp('btn_detail').disable();
								Ext.getCmp('btn_mastercar').disable();
							},
							close:function(){
								Ext.getCmp('btn_refresh').enable();
								Ext.getCmp('btn_search').enable();
								Ext.getCmp('btn_register').enable();
								Ext.getCmp('btn_update').enable();
								Ext.getCmp('btn_cancel').enable();
								Ext.getCmp('btn_detail').enable();
								Ext.getCmp('btn_mastercar').enable();
							}
						}
					});
				}
				win_detail.show();
			}
        }
        /*======================view_detail========================*/
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
						{
							xtype	: 'textfield',
							id		: 'xt_platno',
							name	: 'xt_platno',
							fieldLabel	: 'PLAT NO',
							beforeLabelTextTpl:required+' ',
							labelSeparator: '',
							width: 350,
							listeners       	: {
                                change : function(f, new_val) {
                                    f.setValue(new_val.toUpperCase());
                                }
                            }
						},
						/*{
							xtype	: 'textfield',
							id		: 'xt_fordept',
							name	: 'xt_fordept',
							fieldLabel	: 'USE FOR',
							beforeLabelTextTpl:required+' ',
							labelSeparator: '',
							width: 350,
							listeners       	: {
                                change : function(f, new_val) {
                                    f.setValue(new_val.toUpperCase());
                                }
                            }
						},*/
						{
							xtype	: 'textfield',
							id		: 'xt_driver',
							name	: 'xt_driver',
							fieldLabel	: 'DRIVER NAME',
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
							xtype	: 'textfield',
							id		: 'xt_drivercall',
							name	: 'xt_drivercall',
							fieldLabel	: 'DRIVER TELP',
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
							xtype           	: 'combo',
                            id              	: 'xt_status',
                            name            	: 'xt_status',
                            fieldLabel      	: 'STATUS',
                            beforeLabelTextTpl	: required+' ',
                            labelSeparator		: '',
                            queryMode       	: 'local',
                            displayField    	: 'carstatus',
                            valueField      	: 'carstatus',
                            emptyText       	: 'SELECT STATUS',
                            editable        	: false,
                            allowBlank      	: false,
                            store           	: ds_carstatus,
						},
						{
							xtype	: 'textfield',
							id		: 'xt_carname',
							name	: 'xt_carname',
							fieldLabel	: 'MERK',
							beforeLabelTextTpl:'&nbsp;&nbsp;&nbsp;',
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
                                        url             : 'resp/resp_cars.php',
                                        waitMsg         : 'Sending your data...',
                                        submitEmptyText : false,

                                        success : function(form, action) {
                                            Ext.getCmp('xt_platno').focus(false, 1000);
                                            ds_mastercar.loadPage(1);
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
        /*======================add_master==============================*/
        /*======================upd_master===========================*/
        function upd_master() {
            var rec = Ext.getCmp('gridmastercar').getSelectionModel().getSelection();
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
								id		: 'xt_idcar_upd',
								name	: 'xt_idcar_upd',
								value	: rec[0].data.id_car,
							},
							{
								xtype	: 'textfield',
								id		: 'xt_platno_upd',
								name	: 'xt_platno_upd',
								fieldLabel	: 'PLAT NO',
								beforeLabelTextTpl:required+' ',
								labelSeparator: '',
								value	: rec[0].data.platno,
								width: 350,
								listeners       	: {
									change : function(f, new_val) {
										f.setValue(new_val.toUpperCase());
									}
								}
							},
							{
								xtype	: 'textfield',
								id		: 'xt_driver_upd',
								name	: 'xt_driver_upd',
								fieldLabel	: 'DRIVER NAME',
								beforeLabelTextTpl:required+' ',
								labelSeparator: '',
								width: 350,
								value	: rec[0].data.driver,
								listeners       	: {
									change : function(f, new_val) {
										f.setValue(new_val.toUpperCase());
									}
								}
							},
							{
								xtype	: 'textfield',
								id		: 'xt_drivercall_upd',
								name	: 'xt_drivercall_upd',
								fieldLabel	: 'DRIVER TELP',
								beforeLabelTextTpl:required+' ',
								labelSeparator: '',
								width: 350,
								value	: rec[0].data.driver_call,
								listeners       	: {
									change : function(f, new_val) {
										f.setValue(new_val.toUpperCase());
									}
								}
							},
							{
								xtype           	: 'combo',
								id              	: 'xt_status_upd',
								name            	: 'xt_status_upd',
								fieldLabel      	: 'STATUS',
								emptyText       	: 'SELECT STATUS',
								beforeLabelTextTpl	: required+' ',
								labelSeparator		: '',
								displayField    	: 'carstatus',
								valueField      	: 'carstatus',
								editable        	: true,
								typeAhead        	: true,
								queryMode			: 'local',
								allowBlank      	: false,
								store           	: ds_carstatus,
								value				: rec[0].data.status,
							},
							{
								xtype	: 'textfield',
								id		: 'xt_carname_upd',
								name	: 'xt_carname_upd',
								fieldLabel	: 'MERK',
								beforeLabelTextTpl:'&nbsp;&nbsp;&nbsp;',
								value	: rec[0].data.carname,
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
							/*{
								text    : 'Reset',
								iconCls	: 'icon-reset-icon8',
								handler : function() {
									this.up('form').getForm().reset();
								}
							},*/
							{
								text    	: 'UPDATE',
								iconCls		: 'icon-save-icon8',
								formBind	: true,
								handler  	: function() {
									var form = this.up('form').getForm();
									var popwindow = this.up('window');
									if (form.isValid()) {
										form.submit({
											url             : 'resp/resp_cars.php',
											waitMsg         : 'Sending your data...',
											submitEmptyText : false,

											success : function(form, action) {
												Ext.getCmp('xt_platno_upd').focus(false, 1000);
												ds_mastercar.loadPage(1);
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
        /*======================upd_master==============================*/
        /*======================del_master===========================*/
     /*   function del_master(widget, event) {
			var rec = Ext.getCmp('gridmastercar').getSelectionModel().getSelection();
			if(rec == 0){
				Ext.Msg.show({
					title   : 'Warning',
					icon    : Ext.Msg.ERROR,
					msg     : "No data selected.",
					button  : Ext.Msg.OK  
				});
			}
			else{
				var win_delmaster;
				if (!win_delmaster) {
					var form_delmaster = Ext.widget('form', {
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
								html	: 'Are you sure to DELETE this master ??'
							},
							{
								xtype	: 'hiddenfield',
								name	: 'xt_idcar',
								value	: rec[0].data.id_car
							},
							{
								xtype	: 'hiddenfield',
								name	: 'xt_type',
								value	: 'delmaster',
							}
						],
						buttons			: [
							{
								text	: 'DELETE',
								iconCls	: 'icon-cancel-icon8',
								handler	: function() {
									var form = this.up('form').getForm();
									var popwindow = this.up('window');
									if (form.isValid()) {
										form.submit({
											url		: 'resp/resp_cars.php',
											waitMsg	: 'sending data',

											success	: function(form, action) {
												popwindow.close();
												ds_mastercar.loadPage();
												ds_detail.loadPage();
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
													title		:'Failure - Delete Data',
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

					win_delmaster = Ext.widget('window', {
						title			: 'Cancel Reservation',
						bodyStyle    	: { background :'rgba(122, 0, 61, 1); padding-bottom: 5px;'},
						minWidth		: 380,
						autoHeight		: true,
						modal			: true,
						constrain		: true,
						layout			: 'fit',
						animateTarget	: 'btn_delmaster',
						items			: form_delmaster
					});
				}
				win_delmaster.show();
			}
		}
        /*======================del_master===========================*/
		
		/*======================mastertransport========================*/
        function mastercar (widget, event){
            ds_mastercar.loadPage(1);
			var win_mastercar;
			if (!win_mastercar) {
				var form_mastercar = Ext.widget('form',{
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
							id     : 'btn_addmaster',
							text   : 'Add Master',
							iconCls: 'icon-plus-icon8',
							tooltip: 'Create New Master',
							scale  : 'medium',
							handler : add_master
						},
						{
							xtype  : 'button',
							id     : 'btn_updmaster',
							text   : 'Edit Master',
							iconCls: 'icon-edit-icon8',
							tooltip: 'Editing selected Master',
							scale  : 'medium',
							handler : upd_master
						},
						/*{
							xtype  : 'button',
							id     : 'btn_delmaster',
							text   : 'Delete Master',
							iconCls: 'icon-minus-icon8',
							tooltip: 'Delete Masater Selection',
							scale  : 'medium',
							handler : del_master
						},*/
					],
					items: [
						{
							xtype		: 'grid',
							id			: 'gridmastercar',
							store		: ds_mastercar,
							height		: 400,
							autoScroll	: true,
							columns		: [
								{header: 'NO', xtype: 'rownumberer', width: 50, height: 40, sortable: false },
								{ text: 'PLAT NO', 			dataIndex: 'platno',		width: 80, 	tdCls:'wrap-text', align:'left' },
								{ text: 'FOR DEPARTMENT',	dataIndex: 'dept',			width: 100, tdCls:'wrap-text', align:'left', hidden:true },
								{ text: 'DRIVER', 			dataIndex: 'driver', 		width: 150, tdCls:'wrap-text', align:'left' },
								{ text: 'CALL NUMBER', 		dataIndex: 'driver_call',	width: 110, tdCls:'wrap-text', align:'left' },
								{ text: 'STATUS', 			dataIndex: 'status', 		width: 130, tdCls:'wrap-text', align:'left' },
								{ text: 'MERK', 			dataIndex: 'carname', 		flex: 1,	tdCls:'wrap-text', align:'left' },
							]
						}
					],
				});
				win_mastercar = Ext.widget('window',{
					title			: 'TRANSPORTATION MASTER',
					width			: 670,
					heigth			: 400,
					modal			: true,
					constrain		: true,
					layout			: 'fit',
					animateTarget	: 'btn_mastercar',
					items			: form_mastercar,
					listeners		: {
						activate:function(){
							Ext.getCmp('btn_refresh').disable();
							Ext.getCmp('btn_search').disable();
							Ext.getCmp('btn_register').disable();
							Ext.getCmp('btn_update').disable();
							Ext.getCmp('btn_cancel').disable();
							Ext.getCmp('btn_detail').disable();
							Ext.getCmp('btn_mastercar').disable();
						},
						close:function(){
							Ext.getCmp('btn_refresh').enable();
							Ext.getCmp('btn_search').enable();
							Ext.getCmp('btn_register').enable();
							Ext.getCmp('btn_update').enable();
							Ext.getCmp('btn_cancel').enable();
							Ext.getCmp('btn_detail').enable();
							Ext.getCmp('btn_mastercar').enable();
						}
					}
				});
			}
			win_mastercar.show();
        }
        /*======================mastertransport========================*/
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
                            xtype				: 'combo',
                            id					: 'xt_car_src',
                            name				: 'xt_car_src',
                            fieldLabel			: 'TRANSPORT',
                            emptyText			: 'SELECT TRANSPORTATION',
                            labelSeparator		: '',
                            typeAhead			: true,
                            editable			: true,
                            queryMode			: 'local',
                            store				: ds_cardata,
                            displayField		: 'platno',
                            valueField			: 'id_car',
                            listConfig			:{
                                getInnerTpl	: function() {
                                    return '<div><b>{platno}</b> - ( {status} )</div>';
                                }
                            },
                        },
						{
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
						{
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
                                ds_view.proxy.setExtraParam('src_car', '' );
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
									ds_view.proxy.setExtraParam('src_car', Ext.getCmp('xt_car_src').getValue() );
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
                            Ext.getCmp('btn_detail').disable();
                            Ext.getCmp('btn_mastercar').disable();
                        	
                        },
                        close:function(){
                            Ext.getCmp('btn_refresh').enable();
                            Ext.getCmp('btn_search').enable();
                            Ext.getCmp('btn_register').enable();
                            Ext.getCmp('btn_update').enable();
                        	Ext.getCmp('btn_cancel').enable();
                            Ext.getCmp('btn_detail').enable();
                            Ext.getCmp('btn_mastercar').enable();
                       	
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
            renderTo	: 'cars',
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
								ds_view.proxy.setExtraParam('src_car', '' );
								ds_view.proxy.setExtraParam('src_date', '' );
                            	ds_view.proxy.setExtraParam('src_incharge', '' );
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
                            text   : 'Register Transport',
                            iconCls: 'icon-register-icon8',
                            scale  : 'medium',
                            tooltip: 'Register your reservation',
                            handler: register_data
                        },
                        {
                            xtype  : 'button',
                            id     : 'btn_update',
                            text   : 'Edit Transport Reservation',
                            iconCls: 'icon-edit-icon8',
                            tooltip: 'Editing your selection reservation',
                            scale  : 'medium',
                            handler : update_data
                        },
                        {
                            xtype  : 'button',
                            id     : 'btn_cancel',
                            text   : 'Cancel Transport',
                            iconCls: 'icon-cancel-icon8',
                            tooltip: 'Cancel your reservation',
                            scale  : 'medium',
                            handler : cancel_data
                        },
                        {
                            xtype  : 'button',
                            id     : 'btn_detail',
                            text   : 'Detail Follower',
                            iconCls: 'icon-detail-icon8',
                            scale  : 'medium',
                            tooltip: 'Detail Followers in reservation selected Transport',
                            handler: view_detail
                        },
                        '->',
                        {
                            xtype  : 'button',
                            id     : 'btn_mastercar',
                            text   : 'Transportation Master',
                            iconCls: 'icon-master-icon8',
                            scale  : 'medium',
                            tooltip: 'Editing Transportation data',
                            handler: mastercar
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
                           /* { header: 'NO', xtype: 'rownumberer', width: 40, height: 40, sortable: false },
							{ header: 'DRIVER DATA', columns:[
								{ text: 'PLAT NOMOR',	dataIndex: 'platno',	width:80, tdCls:'wrap-text',  align:'center'},
								{ text: 'NAME',		dataIndex: 'driver',    width:90, tdCls:'wrap-text',  align:'left'},
								{ text: 'TELP',		dataIndex: 'driver_call',    width:115, tdCls:'wrap-text',  align:'center'},
							]},
							{ header: 'INCHARGE', 	dataIndex: 'incharge',	width:150,  tdCls:'wrap-text',  align:'left'},
							{ header: 'DEPARTMENT', dataIndex: 'dept',    	width:150, tdCls:'wrap-text',  align:'left'},
							{ header: 'START', columns:[
								{ text: 'DATE', dataIndex: 'start_date',width:90, tdCls:'wrap-text',  align:'center'},
								{ text: 'TIME', dataIndex: 'start_time',width:70, tdCls:'wrap-text',  align:'center'}
							]},
							{ header: 'END', columns:[
								{ text: 'DATE', 	dataIndex: 'end_date',  width:90, tdCls:'wrap-text',  align:'center'},
								{ text: 'TIME', 	dataIndex: 'end_time',  width:70,  tdCls:'wrap-text',  align:'center'}
							]},
							{ header: 'DESTINATION',dataIndex: 'destination',flex:1, tdCls:'wrap-text', align:'left'},
							{ header: 'PURPOSE',  	dataIndex: 'purpose',	flex:1, tdCls:'wrap-text',  align:'left'},
							{ header: 'REMARK',  	dataIndex: 'remark',	flex:1, tdCls:'wrap-text',  align:'left'},*/
							{ header: 'NO', xtype: 'rownumberer', width: 40, height: 40, sortable: false },
							{ header: 'PLAT NOMOR',	dataIndex: 'platno',	width:80, tdCls:'wrap-text',  align:'center'},
							{ header: 'DRIVER NAME',dataIndex: 'driver',    width:90, tdCls:'wrap-text',  align:'left'},
							{ header: 'DRIVER TELP',dataIndex: 'driver_call',width:115, tdCls:'wrap-text',  align:'center'},
							{ header: 'INCHARGE', 	dataIndex: 'incharge',	width:150,  tdCls:'wrap-text',  align:'left'},
							{ header: 'DEPARTMENT', dataIndex: 'dept',    	width:150, tdCls:'wrap-text',  align:'left'},
							{ header: 'START DATE', dataIndex: 'start_date',width:90, tdCls:'wrap-text',  align:'center',
							renderer: Ext.util.Format.dateRenderer('d F Y')},
							{ header: 'START TIME', dataIndex: 'start_time',width:70, tdCls:'wrap-text',  align:'center'},
							{ header: 'END DATE', 	dataIndex: 'end_date',  width:90, tdCls:'wrap-text',  align:'center',
							renderer: Ext.util.Format.dateRenderer('d F Y')},
							{ header: 'END TIME', 	dataIndex: 'end_time',  width:70,  tdCls:'wrap-text',  align:'center'},
							{ header: 'DESTINATION',dataIndex: 'destination',flex:1, tdCls:'wrap-text', align:'left'},
							{ header: 'PURPOSE',  	dataIndex: 'purpose',	flex:1, tdCls:'wrap-text',  align:'left'},
							{ header: 'REMARK',  	dataIndex: 'remark',	flex:1, tdCls:'wrap-text',  align:'left'},
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
