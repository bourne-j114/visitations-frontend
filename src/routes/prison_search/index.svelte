<script>
    import {post} from 'utils.js';

    let prison_type = 1;
    let gender = "m";
    let absent = 1;
    let start_receive_date= "0000-00-00";
    let end_receive_date = "0000-00-00";
    let start_release_date = "0000-00-00";
    let end_release_date= "0000-00-00";

    async function submit() {

        const response = await post(`prison/query`, {
            prison_type,
            gender,
            absent,
            start_receive_date,
            end_receive_date,
            start_release_date,
            end_release_date
        });

    }

</script>

<svelte:head>
    <title>Visitors service</title>
</svelte:head>

<div class="home-page">
    <div class="banner">
        <div class="container">
            <h1 class="logo-font">Visitors service</h1>
            <p>ระบบการค้นหาผู้ต้องขัง</p>

        </div>
    </div>

    <div class="container page">

        <h4>ค้นหา</h4>
        <div class="article-preview">
            <div class="article-meta">
                <div class="info">
                    ประเภทผู้ต้องขัง:
                    <label>
                        <input name="prison_type" value={1} type=radio bind:group={prison_type}>
                        ผู้ต้องขัง
                    </label>
                    <label>
                        <input name="prison_type" value={2} type=radio bind:group={prison_type}>
                        ฟื้นฟู่
                    </label>
                    <br>
                    สถานะ:
                    <label>
                        <input name="absent" value={1} type=radio bind:group={absent}>
                        อยู่
                    </label>
                    <label>
                        <input name="absent" value={0} type=radio bind:group={absent}>
                        ไม่อยู่
                    </label>
                    <br>
                    เพศ:
                    <label>
                        <input name="gender" value="m" type=radio bind:group={gender}>
                        ชาย
                    </label>
                    <label>
                        <input name="gender" value="f" type=radio bind:group={gender}>
                        หญิง
                    </label>
                    <fieldset class="form-group">
                        รับตัว วันที่: <input type="date" bind:value={start_receive_date}> - <input type="date"
                                                                                                    bind:value={end_receive_date}>
                    </fieldset>

                    <fieldset class="form-group">
                        ปล่อยตัว วันที่: <input type="date" bind:value={start_release_date}> - <input type="date"
                                                                                                      bind:value={end_release_date}>
                    </fieldset>
                    <button class="btn btn-lg pull-xs-right btn-primary" type="button" on:click={submit}>
                        ตกลง
                    </button>
                </div>
            </div>
        </div>
    </div>

</div>