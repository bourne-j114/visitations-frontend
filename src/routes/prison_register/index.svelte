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
    import * as api from 'api.js';

    const {session} = stores();
    let prison_id = "00001",
        gender = "m",
        first_name,
        last_name,
        nick_name,
        birth_day,
        picture_paht,
        location,
        prison_type = 2,
        case_detail,
        punish,
        remark,
        id_card,
        jail_date,
        jail_status,
        catch_date,
        receive_date,
        address_no,
        court_order,
        case_no,
        police_station,
        scheduled_release15,
        scheduled_release45,
        cause_release,
        moo,
        subdistric,
        distric,
        province,
        nation,
        race,
        nationality,
        religion,
        blame,
        education,
        edu_institution,
        edu_address1,
        status,
        child,
        sibling,
        child_in_a_child,
        home_owner,
        stay_address_no,
        stay_moo,
        stay_subdistric,
        stay_distric,
        stay_province,
        occupation,
        income,
        history_punish,
        history_punish_year,
        history_punish_month,
        history_punish_day,
        be_punished,
        prove_pass_num,
        cur_num, errors;
    let files;
    let dataFile = null;
    async function submit(event) {
        const formData = new FormData();
        let   profile = {
            prison_id,
            gender,
            first_name,
            last_name,
            nick_name,
            birth_day,
            picture_paht,
            location,
            prison_type,
            remark,
            id_card,
            address_no,
            moo,
            subdistric,
            distric,
            province,
            nation,
            race,
            nationality,
            religion,
            blame,
            education,
            edu_institution,
            edu_address1,
            status,
            child,
            sibling,
            child_in_a_child,
            home_owner,
            stay_address_no,
            stay_moo,
            stay_subdistric,
            stay_distric,
            stay_province,
            occupation,
            income,
            history_punish,
            history_punish_year,
            history_punish_month,
            history_punish_day,
            prove_pass_num,
            cur_num
        };
        let case_datail = {
            prison_id,
            court_order,
            case_no,
            case_detail,
            police_station,
            catch_date,
            receive_date,
        };
        let json = {profile,case_datail};
        json = JSON.stringify(json);
        formData.append('data', json);
        formData.append('dataFile', files[0]);
        const response = await api.upload(`prisons/register/${prison_id}`,formData ,$session.user && $session.user.token);
       console.log("XXX",response);
        errors = response.errors;

        if (response.user) {
            $session.user = response.user;
            goto('/');
        }
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
                        หมายเลขคดี:<input type="text" required placeholder="หมายเลขคดี" bind:value={case_no}>
                        คำสั่งศาล:<input type="text" required size="35" placeholder="คำสั่งศาล" bind:value={court_order}>
                    </fieldset>
                    <fieldset class="form-group">
                        พฤติการณ์และสาเหตุการกระทำผิด: <input type="text" required size="50" bind:value={case_detail}>
                    </fieldset>
                    <fieldset class="form-group">
                        สน.ท้องที่:<input type="text" required size="30" placeholder="สน.ท้องที่" bind:value={police_station}>
                        ประเภทนักโทษ:<label>
                        <input name="prison_type" value={1} type=radio bind:group={prison_type}>
                        ผู้ต้องขัง
                    </label>
                        <label><input  name="prison_type"  value={2} type=radio bind:group={prison_type}>
                            ฟื้นฟู
                        </label>
                    </fieldset>
                    <fieldset class="form-group">
                        ถูกจับเมื่อวันที่: <input type="date" required placeholder="ถูกจับเมื่อวันที่"
                                                  bind:value={catch_date}>
                        รับตัวเมื่อวันที่: <input type="date" required placeholder="รับตัวเมื่อวันที่"
                                                  bind:value={receive_date}>
                    </fieldset>
                    <h4>ประวัติส่วนตัว</h4>
                    <hr>
                    <fieldset class="form-group">
                        รหัสผู้ต้องขัง: <input type="text" required placeholder="รหัสผู้ต้องขัง"
                                                  bind:value={catch_date}>
                        รูปภาพ: <input type="file"  bind:files>
                    </fieldset>
                    <fieldset class="form-group">
                        ชื่อ:<input type="text" required placeholder="ชื่อ" bind:value={first_name}>
                        นามสกุล:<input type="text" required placeholder="นามสกุล" bind:value={last_name}>
                        ชื่อเล่น:<input type="text" required size="10" placeholder="ชื่อเล่น" bind:value={nick_name}>
                    </fieldset>
                    <fieldset class="form-group">
                        เพศ: <label>
                        <input name="allow" value="m" type=radio bind:group={gender}>
                        ชาย
                    </label>
                        <label>
                            <input name="allow" value="f" type=radio bind:group={gender}>
                            หญิง
                        </label>

                        เลขบัตรประชาชน: <input type="text" required size="12" placeholder="เลขบัตร" bind:value={id_card}>
                        วัน เดือน ปี เกิด: <input type="text" required size="10" placeholder="วันเกิด" bind:value={birth_day}>
                    </fieldset>
                    <h4>ที่อยู่ตามทะเบียนบ้าน</h4>
                    <hr>
                    <fieldset class="form-group">
                        บ้านเลขที่: <input type="text" size="3" required bind:value={address_no}>
                        หมู่ที่:<input type="text" size="3" required bind:value={moo}>
                        ตำบล: <input type="text" required placeholder="ตำบล" bind:value={subdistric}>
                    </fieldset>
                    <fieldset class="form-group">
                        อำเภอ:<input type="text" required placeholder="อำเภอ" bind:value={distric}>
                        จังหวัด: <input type="text" required placeholder="จังหวัด" bind:value={province}>
                    </fieldset>
                    <h4>ที่อยู่ปัจจุบัน</h4>
                    <hr>
                    <fieldset class="form-group">
                        บ้านเลขที่: <input type="text" required size="3" bind:value={stay_address_no}>
                        หมู่ที่:<input type="text" required size="3" bind:value={stay_moo}>
                        ตำบล: <input type="text" required placeholder="ตำบล" bind:value={stay_subdistric}>
                    </fieldset>
                    <fieldset class="form-group">
                        อำเภอ:<input type="text" required placeholder="อำเภอ" bind:value={stay_distric}>
                        จังหวัด: <input type="text" required placeholder="จังหวัด" bind:value={stay_province}>
                    </fieldset>
                    <br/>
                    <h4>ข้อมูลประวัติส่วนตัว</h4>
                    <hr>
                    <fieldset class="form-group">
                        เชื้อชาติ: <input type="text" required size="14" placeholder="เชื้อชาติ" bind:value={race}>
                        สัญชาติ: <input type="text" required size="14" placeholder="สัญชาติ" bind:value={nationality}>
                        ศาสนา: <input type="text" required size="14" placeholder="ศาสนา" bind:value={religion}>
                    </fieldset>
                    <fieldset class="form-group">
                        ตำหนิ: <input type="text" required placeholder="ตำหนิ" size="60" bind:value={blame}>
                    </fieldset>
                    <fieldset class="form-group">
                        ระดับการศึกษา: <input type="text" required placeholder="ระดับการศึกษา" bind:value={education}>
                        ชื่อที่อยู่สถานศึกษา: <input type="text" required placeholder="ชื่อที่อยู่สถานศึกษา"
                                                     bind:value={edu_institution}>
                    </fieldset>
                    <fieldset class="form-group">
                        สถานภาพ: <input type="text" required placeholder="สถานภาพ" bind:value={status}>
                        จำนวนบุตร: <input type="number" size="3" bind:value={child}>
                    </fieldset>
                    <fieldset class="form-group">
                        มีพี่น้องร่วม: <input type="number" required size="3" bind:value={sibling}>คน
                        เป็นบุตรคนที่:<input type="number" required size="3" bind:value={child_in_a_child}>
                        พักอาศัยบ้านของ: <input type="text" required placeholder="พักอาศัยบ้านของ" bind:value={home_owner}>
                    </fieldset>
                    <fieldset class="form-group">
                        อาชีพ: <input type="text" required placeholder="อาชีพ" bind:value={occupation}>
                        รายได้: <input type="text" required placeholder="รายได้" bind:value={income}>บาท
                    </fieldset>
                    <h4>ประวัติการต้องโทษ</h4>
                    <hr>
                    <fieldset class="form-group">
                        ประวัติการต้องโทษ: <input type="text" required placeholder="ประวัติการต้องโทษ"
                                                  bind:value={history_punish}>
                        ระยะเวลา: <input type="number" required size="2" bind:value={history_punish_year}>
                        ปี<input type="number" required size="2" bind:value={history_punish_month}>
                        เดือน<input type="number" required size="2" bind:value={history_punish_day}>วัน
                    </fieldset>
                    <fieldset class="form-group">
                        จำนวนครั้งที่ผ่านการตรวจพิสูจน์: <input type="number" required size="3"
                                                                bind:value={prove_pass_num}>ครั้ง
                        เคยผ่านการบำบัด: <input type="number" required size="3" bind:value={cur_num}>ครั้ง
                    </fieldset>
                    <button class="btn btn-lg btn-primary pull-xs-right">
                        บันทึก
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>