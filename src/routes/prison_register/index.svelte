<script context="module">
    export async function preload({params}, {user}) {
        if (user) {
            this.redirect(302, `/`);
        }
    }
</script>

<script>
    import {goto, stores} from '@sapper/app';
    import ListErrors from '../_components/ListErrors.svelte';
    import QuickSearchBar from "svelte-quicksearch-bar";
    import * as api from 'api.js';

    const {session} = stores();
    let profile = {
        prison_id: "",
        gender: "m",
        first_name: "",
        last_name: "",
        nick_name: "",
        birth_day: "",
        prison_type: 1,
        remark: "",
        id_card: "",
        address_no: "",
        moo: "",
        subdistric: "",
        distric: "",
        province: "",
        nation: "",
        race: "",
        nationality: "",
        religion: "",
        blame: "",
        education: "",
        edu_institution: "",
        status: "",
        child: 0,
        sibling: 0,
        child_in_a_child: 0,
        home_owner: "",
        stay_address_no: "",
        stay_moo: "",
        stay_subdistric: "",
        stay_distric: "",
        stay_province: "",
        occupation: "",
        income: "",
        history_punish: "",
        history_punish_year: "",
        history_punish_month: "",
        history_punish_day: "",
        prove_pass_num: "",
        cur_num: ""
    };
   let case_detail = {
        prison_id: "",
        court_order: "",
        case_no: "",
        case_detail: "",
        police_station: "",
        catch_date: "",
        receive_date: "",
    };
    let prison_id = "";
    case_detail.prison_type = 1;
    let errors;
    let options = [];
    let selectedOption;
    $: getData();
    async function getData() {
        options = [];
        let query = `prisons/list`;
        (options  = await api.get(query, $session.user && $session.user.token));
    }
    async function getPrisonInfo() {
        prison_id = profile.prison_id;
        let query = `prisons/getinfo/${prison_id}`;
        profile = await api.get(query, $session.user && $session.user.token);
        console.log(profile);
    }

    let files;
    let dataFile = null;
    async function submit(event) {
        const formData = new FormData();

        let json = {profile,case_detail};
        case_detail.prison_id = prison_id;
        json = JSON.stringify(json);
        formData.append('data', json);
        console.log(typeof files)
        if (typeof files !== "undefined" )
           formData.append('dataFile', files[0]);

        const response = await api.upload(`prisons/register/${prison_id}`,formData)
            .then(function (datums) {
                console.log(datums);
            })
            .catch(function (err) {
                console.error('Augh, there was an error!', err.statusText);
            });

        console.log("XXX",response);
    }
    const onPick = e => {
        selectedOption = e.detail;
        profile.prison_id = selectedOption['prison_id'];
        getPrisonInfo()
    }
</script>

<svelte:head>
    <title>Sign up • Conduit</title>
</svelte:head>

<div class="auth-page">
    <div class="container page">
        <div class="row">
            <div class="col-md-10 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">บันทึกคดี</h1>
                <ListErrors {errors}/>

                <form on:submit|preventDefault={submit}>
                    <h4>คดี</h4>
                    <hr>
                    <fieldset class="form-group">
                        หมายเลขคดี:<input type="text" required placeholder="หมายเลขคดี" bind:value={case_detail.case_no}>
                        คำสั่งศาล:<input type="text" required size="35" placeholder="คำสั่งศาล" bind:value={case_detail.court_order}>
                    </fieldset>
                    <fieldset class="form-group">
                        พฤติการณ์และสาเหตุการกระทำผิด: <input type="text" required size="50" bind:value={case_detail.case_detail}>
                    </fieldset>
                    <fieldset class="form-group">
                        สน.ท้องที่:<input type="text" required size="30" placeholder="สน.ท้องที่" bind:value={case_detail.police_station}>
                        ประเภทนักโทษ:<label>
                        <input name="prison_type" value={1} type=radio bind:group={case_detail.prison_type}>
                        ผู้ต้องขัง
                    </label>
                        <label><input  name="prison_type"  value={2} type=radio bind:group={case_detail.prison_type}>
                            ฟื้นฟู
                        </label>
                    </fieldset>
                    <fieldset class="form-group">
                        ถูกจับเมื่อวันที่: <input type="date" required placeholder="ถูกจับเมื่อวันที่"
                                                  bind:value={case_detail.catch_date}>
                        รับตัวเมื่อวันที่: <input type="date" required placeholder="รับตัวเมื่อวันที่"
                                                  bind:value={case_detail.receive_date}>
                    </fieldset>
                    <h4>ประวัติส่วนตัว</h4>
                    <hr>
                    <fieldset class="form-group">
                        <QuickSearchBar {options} on:pick={onPick} keys={['prison_id', 'full_name']} />

                        <p>กด CTRL + K เพื่อค้นหาผู้ตัองขัง)</p>
                        รหัสผู้ต้องขัง: <input type="text" required placeholder="รหัสผู้ต้องขัง"
                                                  bind:value={profile.prison_id}>
                        รูปภาพ: <input type="file"  bind:files>
                    </fieldset>

                    <fieldset class="form-group">
                        ชื่อ:<input type="text" required placeholder="ชื่อ" bind:value={profile.first_name}>
                        นามสกุล:<input type="text" required placeholder="นามสกุล" bind:value={profile.last_name}>
                        ชื่อเล่น:<input type="text" required size="10" placeholder="ชื่อเล่น" bind:value={profile.nick_name}>
                    </fieldset>
                    <fieldset class="form-group">
                        เพศ: <label>
                        <input name="allow" value="m" type=radio bind:group={profile.gender}>
                        ชาย
                    </label>
                        <label>
                            <input name="allow" value="f" type=radio bind:group={profile.gender}>
                            หญิง
                        </label>

                        เลขบัตรประชาชน: <input type="text" required size="12" placeholder="เลขบัตร" bind:value={profile.id_card}>
                        วัน เดือน ปี เกิด: <input type="text" required size="10" placeholder="วันเกิด" bind:value={profile.birth_day}>
                    </fieldset>
                    <h4>ที่อยู่ตามทะเบียนบ้าน</h4>
                    <hr>
                    <fieldset class="form-group">
                        บ้านเลขที่: <input type="text" style="width: 50px;" required bind:value={profile.address_no}>
                        หมู่ที่:<input type="text" style="width: 50px;" required bind:value={profile.moo}>
                        ตำบล: <input type="text" required placeholder="ตำบล" bind:value={profile.subdistric}>
                    </fieldset>
                    <fieldset class="form-group">
                        อำเภอ:<input type="text" required placeholder="อำเภอ" bind:value={profile.distric}>
                        จังหวัด: <input type="text" required placeholder="จังหวัด" bind:value={profile.province}>
                    </fieldset>
                    <h4>ที่อยู่ปัจจุบัน</h4>
                    <hr>
                    <fieldset class="form-group">
                        บ้านเลขที่: <input type="text" required style="width: 50px;" bind:value={profile.stay_address_no}>
                        หมู่ที่:<input type="text" required style="width: 50px;" bind:value={profile.stay_moo}>
                        ตำบล: <input type="text" required placeholder="ตำบล" bind:value={profile.stay_subdistric}>
                    </fieldset>
                    <fieldset class="form-group">
                        อำเภอ:<input type="text" required placeholder="อำเภอ" bind:value={profile.stay_distric}>
                        จังหวัด: <input type="text" required placeholder="จังหวัด" bind:value={profile.stay_province}>
                    </fieldset>
                    <br/>
                    <h4>ข้อมูลประวัติส่วนตัว</h4>
                    <hr>
                    <fieldset class="form-group">
                        เชื้อชาติ: <input type="text" required size="14" placeholder="เชื้อชาติ" bind:value={profile.race}>
                        สัญชาติ: <input type="text" required size="14" placeholder="สัญชาติ" bind:value={profile.nationality}>
                        ศาสนา: <input type="text" required size="14" placeholder="ศาสนา" bind:value={profile.religion}>
                    </fieldset>
                    <fieldset class="form-group">
                        ตำหนิ: <input type="text" required placeholder="ตำหนิ" size="60" bind:value={profile.blame}>
                    </fieldset>
                    <fieldset class="form-group">
                        ระดับการศึกษา: <input type="text" required placeholder="ระดับการศึกษา" bind:value={profile.education}>
                        ชื่อที่อยู่สถานศึกษา: <input type="text" required placeholder="ชื่อที่อยู่สถานศึกษา"
                                                     bind:value={profile.edu_institution}>
                    </fieldset>
                    <fieldset class="form-group">
                        สถานภาพ: <input type="text" required placeholder="สถานภาพ" bind:value={profile.status}>
                        จำนวนบุตร: <input type="number" style="width: 50px;" bind:value={profile.child}>
                    </fieldset>
                    <fieldset class="form-group">
                        มีพี่น้องร่วม: <input type="number" required style="width: 50px;" bind:value={profile.sibling}>คน
                        เป็นบุตรคนที่:<input type="number" required style="width: 50px;" bind:value={profile.child_in_a_child}>
                        พักอาศัยบ้านของ: <input type="text" required placeholder="พักอาศัยบ้านของ" bind:value={profile.home_owner}>
                    </fieldset>
                    <fieldset class="form-group">
                        อาชีพ: <input type="text" required placeholder="อาชีพ" bind:value={profile.occupation}>
                        รายได้: <input type="text" required placeholder="รายได้" bind:value={profile.income}>บาท
                    </fieldset>
                    <h4>ประวัติการต้องโทษ</h4>
                    <hr>
                    <fieldset class="form-group">
                        ประวัติการต้องโทษ: <input type="text" required placeholder="ประวัติการต้องโทษ"
                                                  bind:value={profile.history_punish}>
                        ระยะเวลา: <input type="number" required style="width: 50px;" bind:value={profile.history_punish_year}>
                        ปี<input type="number" required style="width: 50px;" bind:value={profile.history_punish_month}>
                        เดือน<input type="number" required style="width: 50px;" bind:value={profile.history_punish_day}>วัน
                    </fieldset>
                    <fieldset class="form-group">
                        จำนวนครั้งที่ผ่านการตรวจพิสูจน์: <input type="number" required style="width: 50px;"
                                                                bind:value={profile.prove_pass_num}>ครั้ง
                        เคยผ่านการบำบัด: <input type="number" required style="width: 50px;" bind:value={profile.cur_num}>ครั้ง
                    </fieldset>
                    <button class="btn btn-lg btn-primary pull-xs-right">
                        บันทึก
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>