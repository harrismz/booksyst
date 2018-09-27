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
    /*==========ds_cars===========*/
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
        /*=========ds_detail==========*/
        /*=========ds_mastercar==========*/
        Ext.define('M_mastercar',{
            extend: 'Ext.data.Model',
            fields: ['id_car','platno','dept','driver','driver_call','carname']
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
								Ext.getCmp('btn_detail').disable();
							},
							close:function(){
								Ext.getCmp('btn_refresh').enable();
								Ext.getCmp('btn_search').enable();
								Ext.getCmp('btn_detail').enable();
							}
						}
					});
				}
				win_detail.show();
			}
        }
        /*======================view_detail========================*/
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
                            }
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
									ds_view.loadPage(1);popwindow.close();
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
                            Ext.getCmp('btn_detail').disable();
                            Ext.getCmp('btn_mastercar').disable();
                        },
                        close:function(){
                            Ext.getCmp('btn_refresh').enable();
                            Ext.getCmp('btn_search').enable();
                            Ext.getCmp('btn_detail').enable();
                            Ext.getCmp('btn_mastercar').enable();
                        }
                    }
                });
            }
            win_search.show();

        }
        /*======================search data===========================*/
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
					items: [
						{
							xtype		: 'grid',
							id			: 'gridmastercar',
							store		: ds_mastercar,
							height		: 250,
							autoScroll	: true,
							columns		: [
								{header: 'NO', xtype: 'rownumberer', width: 50, height: 40, sortable: false },
								{ text: 'PLAT NO', dataIndex: 'platno', flex: 1, tdCls:'wrap-text', align:'left' },
								{ text: 'FOR DEPARTMENT', dataIndex: 'dept', flex: 1, tdCls:'wrap-text', align:'left' },
								{ text: 'DRIVER', dataIndex: 'driver', flex: 1, tdCls:'wrap-text', align:'left' },
								{ text: 'CALL NUMBER', dataIndex: 'driver_call', flex: 1, tdCls:'wrap-text', align:'left' },
								{ text: 'MERK', dataIndex: 'carname', flex: 1, tdCls:'wrap-text', align:'left' },
							]
						}
					],
				});
				win_mastercar = Ext.widget('window',{
					title			: 'TRANSPORTATION MASTER',
					width			: 600,
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
							Ext.getCmp('btn_detail').disable();
							Ext.getCmp('btn_mastercar').disable();
						},
						close:function(){
							Ext.getCmp('btn_refresh').enable();
							Ext.getCmp('btn_search').enable();
							Ext.getCmp('btn_detail').enable();
							Ext.getCmp('btn_mastercar').enable();
						}
					}
				});
			}
			win_mastercar.show();
        }
        /*======================mastertransport========================*/
	//==========================FUNCTION==============================================================================
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
                            tooltip: 'Transportation Master',
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
                            { header: 'NO', xtype: 'rownumberer', width: 40, height: 40, sortable: false },
							/*{ header: 'DRIVER DATA', columns:[
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
							{ header: 'PLAT NOMOR',	dataIndex: 'platno',	width:80, tdCls:'wrap-text',  align:'center'},
							{ header: 'DRIVER NAME',		dataIndex: 'driver',    width:90, tdCls:'wrap-text',  align:'left'},
							{ header: 'DRIVER TELP',		dataIndex: 'driver_call',    width:115, tdCls:'wrap-text',  align:'center'},
							{ header: 'INCHARGE', 	dataIndex: 'incharge',	width:150,  tdCls:'wrap-text',  align:'left'},
							{ header: 'DEPARTMENT', dataIndex: 'dept',    	width:150, tdCls:'wrap-text',  align:'left'},
							{ header: 'START DATE', dataIndex: 'start_date',width:90, tdCls:'wrap-text',  align:'center',
							renderer: Ext.util.Format.dateRenderer('d F Y')},
							{ header: 'START TIME', dataIndex: 'start_time',width:70, tdCls:'wrap-text',  align:'center'},
							{ header: 'END DATE', 	dataIndex: 'end_date',  width:90, tdCls:'wrap-text',  align:'center',
							renderer: Ext.util.Format.dateRenderer('d F Y')},
							{ header: 'END TIME', 	dataIndex: 'end_time',  width:70,  tdCls:'wrap-text',  align:'center'},
							{ header: 'DESTINATION',dataIndex: 'destination',width:150, tdCls:'wrap-text', align:'left'},
							{ header: 'PURPOSE',  	dataIndex: 'purpose',	width:150, tdCls:'wrap-text',  align:'left'},
							{ header: 'REMARK',  	dataIndex: 'remark',	width:100, tdCls:'wrap-text',  align:'left'},
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
