const tanium_yen_table = {
    t6480: 12000,
    t3280: 6100,
    t1980: 3680,
    t980: 1840,
    t300: 610,
    t60: 120
}


class CostCalculator{
    constructor(){
        this.m_count = 0
        this.m_core_cnt = 0
        this.m_crystal_cnt = 0
        this.m_exist_tanium = 0

        this.tanium_list = {
            t6480: 0,
            t3280: 0,
            t1980: 0,
            t980: 0,
            t300: 0,
            t60: 0
        }
    }

    set draw_count(val){
        this.m_count = val
        this.ReCalcCost()
    }

    get yen(){
        let sum = 0

        Object.keys(tanium_yen_table).forEach(x=>{
            sum += (tanium_yen_table[x] * this.tanium_list[x])
        })

        return sum
    }

    set core_count(val){
        let val_fix = Number(val)
        if(isNaN(val_fix)){
            return
        }

        this.m_core_cnt = val_fix
        this.ReCalcCost()
    }

    get core_count(){
        return this.m_core_cnt
    }

    set crystal(val){
        let val_fix = Number(val)
        if(isNaN(val_fix)){
            return
        }

        this.m_crystal_cnt = val_fix
        this.ReCalcCost()
    }

    get crystal(){
        return this.m_crystal_cnt
    }

    set exist_tanium(val){
        let val_fix = Number(val)
        if(isNaN(val_fix)){
            return
        }

        this.m_exist_tanium = val_fix
        this.ReCalcCost()
    }

    get exist_tanium(){
        return this.m_exist_tanium
    }

    get need_tanium(){
        let need_tanium = (this.m_count - this.m_core_cnt) * 150
        need_tanium -= (this.m_crystal_cnt + this.m_exist_tanium)

        if(need_tanium < 0){
            return 0
        }
        return need_tanium
    }

    ReCalcCost(){
        if(this.need_tanium <= 0){
            this.AllZeroTanium()
            return
        }

        let tanium6480 = this.CalcTaniumCountAndMod(this.need_tanium, 6480)
        this.tanium_list.t6480 = tanium6480.tanium_count

        let tanium3280 = this.CalcTaniumCountAndMod(tanium6480.mod, 3280)
        this.tanium_list.t3280 = tanium3280.tanium_count

        let tanium1980 = this.CalcTaniumCountAndMod(tanium3280.mod, 1980)
        this.tanium_list.t1980 = tanium1980.tanium_count

        let tanium980 = this.CalcTaniumCountAndMod(tanium1980.mod,980)
        this.tanium_list.t980 = tanium980.tanium_count

        let tanium300 = this.CalcTaniumCountAndMod(tanium980.mod,300)
        this.tanium_list.t300 = tanium300.tanium_count

        let tanium60 = this.CalcTaniumCountAndMod(tanium300.mod,60)
        this.tanium_list.t60 = tanium60.tanium_count

        if(tanium60.mod > 0){
            this.tanium_list.t60 += 1
        }
    }

    AllZeroTanium(){
        this.tanium_list.t6480 = 0
        this.tanium_list.t3280 = 0
        this.tanium_list.t1980 = 0
        this.tanium_list.t980 = 0
        this.tanium_list.t300 = 0
        this.tanium_list.t60 = 0
    }

    CalcTaniumCountAndMod(need_tanium,tanium){
        return {
            tanium_count: Math.floor(need_tanium / tanium),
            mod: need_tanium % tanium
        }
    }

    GetOneTaniumYen(tanium){
        return this.tanium_list[tanium] * tanium_yen_table[tanium]

    }

}

export default CostCalculator