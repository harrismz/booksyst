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
            fields: ['id_rentroom','roomcode','roomcode2','date','start_time','end_time','dept','incharge','purpose','remark']
        });
        var ds_view = Ext.create('Ext.data.Store',{
            model	: 'M_view',
            autoLoad: true,
            proxy	: {
                type	: 'ajax',
                api     : {
                    read    : 'json/json_viewrooms.php',
                },
                reader	: {
                    type    : 'json',
                    root	: 'data'
                }
            }
        });
        /*=========ds_view==========*/
		/*=========ds_roomdata==========*/
        Ext.define('M_roomdata',{
            extend: 'Ext.data.Model',
            fields: ['id_room','roomname','position','roomname2']
        });
        var ds_roomdata = Ext.create('Ext.data.Store',{
            model	: 'M_roomdata',
            autoLoad: true,
            proxy	: {
                type	: 'ajax',
                api     : {
                    read    : 'json/json_roomdata.php',
                },
                reader	: {
                    type    : 'json',
                    root	: 'data'
                }
            }
        });
        /*=========ds_roomdata==========*/
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
                    read    : 'json/json_roomdetail.php',
                },
                reader	: {
                    type    : 'json',
                    root	: 'data'
                }
            }
        });
        /*=========ds_detail==========*/
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
				var id_rentroom = rec[0].data.id_rentroom;
				var roomcode = rec[0].data.roomcode;
				ds_detail.proxy.setExtraParam('id_rentroom', id_rentroom );
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
									{ text: 'MEMBERS', dataIndex: 'username', flex: 1, tdCls:'wrap-text', align:'left' },
								]
							}
						],
					});
					win_detail = Ext.widget('window',{
						title			: 'DETAIL MEMBERS IN RESERVATION ROOM',
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
                            id					: 'xt_room_src',
                            name				: 'xt_room_src',
                            fieldLabel			: 'SELECT ROOM',
                            emptyText			: 'SELECT ROOM',
                            beforeLabelTextTpl	: required+' ',
                            labelSeparator		: '',
                            typeAhead			: true,
                            editable			: true,
                            queryMode			: 'local',
                            store				: ds_roomdata,
                            displayField		: 'roomname2',
                            valueField			: 'id_room',
                            listeners			: {
                                change	: function(f,new_val) {
                                    ds_roomdata.loadPage(1);
                                }
                            },
                            listConfig			:{
                                getInnerTpl	: function() {
                                    return '<div><b>{roomname2}</b> ( ex-{roomname} )</div>';
                                }
                            },
                            
                        },
                        {
                            xtype 				: 'datefield',
                            id					: 'xt_date_src',
                            name				: 'xt_date_src',
                            fieldLabel			: 'DATE',
                            beforeLabelTextTpl	: required+' ',
                            labelSeparator		: '',
                       //     allowBlank      	: false,
                            format				: 'd F Y',
                            submitFormat		: 'Y-m-d',
                            mode				: 'local',  
                            editable			: false,
                            width				: 350,
                        }
                    ],
                    buttons			: [
                        {
                            text		: 'Reset',
                            iconCls		: 'icon-reset-icon8',
                            handler		: function(){
                                this.up('form').getForm().reset();
                                ds_view.proxy.setExtraParam('src_roomcode', '' );
                            	ds_view.proxy.setExtraParam('src_date', '' );
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
									ds_view.proxy.setExtraParam('src_roomcode', Ext.getCmp('xt_room_src').getValue() );
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
            win_search.show();

        }
        /*======================search data===========================*/
		/*combine column*/
		function combinecolumn(value, meta, record, rowIndex, colIndex, store){
			return '<b>'+value+'</b> ( ex-'+ record.get('roomcode') +' )';
		}
		/*end combine column*/
	//==========================FUNCTION==============================================================================
    //==========================GRID==================================================================================
        var grid = Ext.create('Ext.grid.Panel',{
            renderTo	: 'rooms',
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
								ds_view.proxy.setExtraParam('src_roomcode', '' );
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
                            id     : 'btn_detail',
                            text   : 'Detail Member',
                            iconCls: 'icon-detail-icon8',
                            scale  : 'medium',
                            tooltip: 'Detail Members in reservation selected room',
                            handler: view_detail
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
							{ header: 'id_rentroom',	dataIndex: 'id_rentroom',    flex:1, tdCls:'wrap-text',  align:'left', hidden:true},
							{ header: 'ROOM NAME',	dataIndex: 'roomcode2', width:250, tdCls:'wrap-text',  align:'left', renderer:combinecolumn},
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
