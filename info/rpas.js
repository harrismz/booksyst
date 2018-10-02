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
            fields: ['id_rentrpa','rpacode','rpacode2','date','start_time','end_time','dept','incharge','purpose','remark']
        });
    
        var ds_view = Ext.create('Ext.data.Store',{
            model	: 'M_view',
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
        /*=========ds_view==========*/
		/*=========ds_rpadata==========*/
        Ext.define('M_rpadata',{
            extend: 'Ext.data.Model',
            fields: ['id_rpa','rpaname','position','rpaname2']
        });
        var ds_rpadata = Ext.create('Ext.data.Store',{
            model	: 'M_rpadata',
            autoLoad: true,
            proxy	: {
                type	: 'ajax',
                api     : {
                    read    : 'json/json_rpadata.php',
                },
                reader	: {
                    type    : 'json',
                    root	: 'data'
                }
            }
        });
        /*=========ds_rpadata==========*/
        /*=========ds_rpadata_all==========*/
        Ext.define('M_rpadata_all',{
            extend: 'Ext.data.Model',
            fields: ['id_rpa','rpaname','position','rpaname2']
        });
        var ds_rpadata_all = Ext.create('Ext.data.Store',{
            model	: 'M_rpadata',
            autoLoad: true,
            proxy	: {
                type	: 'ajax',
                api     : {
                    read    : 'json/json_rpadata_all.php',
                },
                reader	: {
                    type    : 'json',
                    root	: 'data'
                }
            }
        });
        /*=========ds_rpadata_all==========*/
    //==========================DS STORE==============================================================================
    //==========================FUNCTION==============================================================================
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
                            id					: 'xt_rpa_src',
                            name				: 'xt_rpa_src',
                            fieldLabel			: 'SELECT RPA',
                            emptyText			: 'SELECT RPA',
                            labelSeparator		: '',
                            typeAhead			: true,
                            editable			: true,
                            queryMode			: 'local',
                            store				: ds_rpadata_all,
                            displayField		: 'rpaname2',
                            valueField			: 'id_rpa',
                            listeners			: {
                                change	: function(f,new_val) {
                                    ds_rpadata_all.loadPage(1);
                                }
                            },
                            listConfig			:{
                                getInnerTpl	: function() {
                                    return '<div>{rpaname2}</div>';
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
                                ds_view.proxy.setExtraParam('src_rpacode', '' );
                            	ds_view.proxy.setExtraParam('src_date', '' );
                                ds_view.loadPage(1);
                            }
                        },
                        {
                            text		: 'Search',
                            iconCls		: 'icon-searchs-icon8',
                            handler		: function(){
                                //ds_view.proxy.setExtraParam('src_rpacode', Ext.getCmp('xt_rpa_src').getValue() );
                            	//ds_view.proxy.setExtraParam('src_date', Ext.getCmp('xt_date_src').getValue() );
                            	//ds_view.loadPage(1);
								
								var form = this.up('form').getForm();
                                var popwindow = this.up('window');
                                if (form.isValid()) {
									ds_view.proxy.setExtraParam('src_rpacode', Ext.getCmp('xt_rpa_src').getValue() );
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
		
	//==========================FUNCTION==============================================================================
    //==========================VARIABLE==============================================================================
         var grouping = Ext.create('Ext.grid.feature.Grouping',{
                            groupHeaderTpl: 'Leave Date : {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'
                        });
    //==========================VARIABLE==============================================================================
    //==========================GRID==================================================================================
        var grid = Ext.create('Ext.grid.Panel',{
            renderTo	: 'rpas',
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
								ds_view.proxy.setExtraParam('src_rpacode', '' );
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
							{ header: 'id_rentrpa',	dataIndex: 'id_rentrpa',    flex:1, tdCls:'wrap-text',  align:'left', hidden:true},
							{ header: 'RPA NAME',	dataIndex: 'rpacode2', width:250, tdCls:'wrap-text',  align:'left'},
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
