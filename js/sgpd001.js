let oilFields = [
    {id:"UT4_Crude_Oil_MBD", qString:"UT4_Crude_Oil_MBD"},
    {id:"UT4_Crude_Oil_MBD", qString:"UT4_Crude_Oil_MBD"},
    {id:"UT4_Crude_Oil_MBD", qString:"UT4_Crude_Oil_MBD"},
    {id:"UT4_Crude_Oil_MBD", qString:"UT4_Crude_Oil_MBD"},
    {id:"UT4_Crude_Oil_MBD", qString:"UT4_Crude_Oil_MBD"},
    {id:"UT4_Crude_Oil_MBD", qString:"UT4_Crude_Oil_MBD"},
    {id:"UT4_Crude_Oil_MBD", qString:"UT4_Crude_Oil_MBD"},
]
let gasFields = [
    {id:"UT4_Gas_MMSCFD", qString:"UT4_Gas_MMSCFD"}
]
let waterFields = [
    {id:"P_UT4_Water_Cut", qString:"P_UT4_Water_Cut"},
    {id:"P_UT8_Water_Cut", qString:"P_UT8_Water_Cut"},
    {id:"P_UT9_Water_Cut", qString:"P_UT9_Water_Cut"},
    {id:"P_UT10_Water_Cut", qString:"P_UT10_Water_Cut"},
    {id:"P_UT11_Water_Cut", qString:"P_UT11_Water_Cut"},
    {id:"P_UT12_Water_Cut", qString:"P_UT12_Water_Cut"},
    {id:"P_UT13_Water_Cut", qString:"P_UT13_Water_Cut"},
]
let injectedWaterFields = [
    {qString:"P_UT4_Injected_Water_MBD"} ,
    {qString:"P_UT8_Injected_Water_MBD"} ,
    {qString:"P_UT9_Injected_Water_MBD"} ,
    { qString:"P_UT10_Injected_Water_MBD"},
    { qString:"P_UT11_Injected_Water_MBD"},
    { qString:"P_UT12_Injected_Water_MBD"},
    { qString:"P_UT13_Injected_Water_MBD"},
]

utGasObj = {
    ut4:{waterId:"", waterQ:"", injectedWaterQ:"", oilId:"", oilQ:"",gasId:"", gasQ:""}
}